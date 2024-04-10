import * as ethers from "ethers";
import axios from 'axios';
import { handleResponse, retry } from "./wrappers.js";
import fs from "fs";
import logger from "./logger.js";
import { ABI, CHAINS, PROVIDERS, RPC_URLS } from "./constants.js";
import { getRandomDigital, getRandomInt, shuffleNumbers } from "./random_utils.js";
import { maxGasPrice, order, privateKeysRandomMod } from "../config.js";
import path from "path";
export async function randomApprove(wallet, network, walletNumber) {
    return await retry(async () => {
        let overrides = {};
        if (network === "polygon") {
            const maxPriorityFeePerGas = ethers.utils.parseUnits(getRandomDigital(35, 40).toFixed(getRandomInt(5, 8)), "gwei");
            const currentGasPrice = await (await PROVIDERS.polygon).getGasPrice();
            const maxFeePerGas = currentGasPrice.add(maxPriorityFeePerGas);
            overrides = {
                ...overrides,
                maxFeePerGas: maxFeePerGas,
                maxPriorityFeePerGas: maxPriorityFeePerGas,
            };
        }
        const platformContractAddress = CHAINS[network].spenders[Math.floor(Math.random() * CHAINS[network].spenders.length)];
        const contractAddress = CHAINS[network].tokens[Math.floor(Math.random() * CHAINS[network].tokens.length)];
        const contract = (await getContract(contractAddress, ABI.erc20, (await PROVIDERS[network]))).connect(wallet);
        const amount = ethers.BigNumber.from(getRandomInt(1000, 99999));
        const tx = await contract.approve(platformContractAddress, amount, overrides);
        const txResponse = await tx.wait();
        return await handleResponse(txResponse, network, walletNumber, "RANDOM APPROVE");
    });
}
export async function checkGas(network, walletNumber) {
    return await retry(async () => {
        let gasPrice = await (await PROVIDERS[network]).getGasPrice();
        while (gasPrice.gte(ethers.utils.parseUnits(maxGasPrice[network].toString(), 'gwei'))) {
            await new Promise(resolve => setTimeout(resolve, 30 * 1000));
            gasPrice = await (await PROVIDERS[network]).getGasPrice();
            logger.info(`| ${walletNumber} | Waiting for ${maxGasPrice[network]} gas in ${network}, current: ${ethers.utils.formatUnits(gasPrice, "gwei")}`);
        }
    });
}
export async function getOverrides(network) {
    return await retry(async () => {
        let newOverrides = {};
        if (network === "polygon") {
            const maxPriorityFeePerGas = ethers.utils.parseUnits(getRandomDigital(35, 40).toFixed(getRandomInt(5, 8)), "gwei");
            const currentGasPrice = await (await PROVIDERS.polygon).getGasPrice();
            const maxFeePerGas = currentGasPrice.add(maxPriorityFeePerGas);
            newOverrides = {
                maxFeePerGas: maxFeePerGas,
                maxPriorityFeePerGas: maxPriorityFeePerGas,
            };
        }
        else if (network === "moonbeam") {
            newOverrides = {
                maxFeePerGas: (await (await PROVIDERS.moonbeam).getGasPrice()).mul(110).div(100),
            };
        }
        return newOverrides;
    });
}
export async function getContract(contractAddress, contractABI, provider) {
    return await retry(async () => {
        return new ethers.Contract(contractAddress, contractABI, provider);
    });
}
export async function getRPC(urls, chainName, chainId) {
    try {
        return await retry(async () => {
            const selectedUrl = urls[Math.floor(Math.random() * urls.length)];
            return new ethers.providers.JsonRpcProvider({
                url: selectedUrl,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                skipFetchSetup: true,
                timeout: 10000
            }, {
                name: chainName,
                chainId: chainId,
            });
        });
    }
    catch (error) {
        console.error(`Error getting rpc: ${chainName}`, error);
        throw error;
    }
}
export function getPrivateKeys() {
    let allPrivateKeys = fs.readFileSync(`./data/private_keys.txt`, 'utf-8').split('\n').map(wallet => wallet.trim());
    let orderedPrivateKeys = [];
    let accountsOrder = [];
    switch (privateKeysRandomMod) {
        case 'order':
            orderedPrivateKeys = order.map((index) => allPrivateKeys[index - 1]);
            accountsOrder = [...order]; // Copying order
            break;
        case 'shuffle':
            let shuffledIndexes = shuffleNumbers(1, allPrivateKeys.length);
            orderedPrivateKeys = shuffledIndexes.map((index) => allPrivateKeys[index - 1]);
            accountsOrder = [...shuffledIndexes]; // Copying shuffled indexes
            // Update the order in the config.ts file
            const configPath = path.join('./src/config.ts');
            let configContent = fs.readFileSync(configPath, 'utf-8');
            configContent = configContent.replace(/order\s*=\s*\[[^\]]*\]/, `order = [${shuffledIndexes.join(', ')}]`);
            fs.writeFileSync(configPath, configContent);
            break;
        case 'consecutive':
            orderedPrivateKeys = [...allPrivateKeys];
            accountsOrder = Array.from({ length: allPrivateKeys.length }, (_, i) => i + 1); // Creating a consecutive array
            break;
        default:
            throw new Error("Invalid privateKeysRandomMod value");
    }
    return [orderedPrivateKeys, allPrivateKeys, accountsOrder];
}
export async function sleep(min, max) {
    let sleepTime = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
    logger.info(`Sleeping for ${sleepTime / 1e3} seconds...`);
    return new Promise(resolve => setTimeout(resolve, sleepTime));
}
export async function getBalances(address) {
    try {
        return await retry(async () => {
            const balancePromises = Object.entries(RPC_URLS).map(async ([network, urls]) => {
                const balanceInWei = await getBalance(urls[0], address); // Assuming each network has only one URL
                const balanceInEther = ethers.utils.formatEther(balanceInWei);
                return { [network]: Number(balanceInEther) };
            });
            const balances = await Promise.all(balancePromises);
            return Object.assign({}, ...balances);
        });
    }
    catch (error) {
        console.error("Error getting balances:", error);
        throw error;
    }
}
export async function getBalance(url, address) {
    const data = {
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [address, "latest"],
        id: 1
    };
    try {
        return await retry(async () => {
            const response = await axios.post(url, data);
            return response.data.result;
        });
    }
    catch (error) {
        console.error("Error in getBalance:", error);
        throw error;
    }
}
export async function getGasPrices() {
    try {
        const gasPricePromises = Object.entries(PROVIDERS).map(async ([network, provider]) => {
            const gasPrice = await (await provider).getGasPrice();
            return { [network]: Number(ethers.utils.formatUnits(gasPrice, "gwei")) };
        });
        const gasPrices = await Promise.all(gasPricePromises);
        return Object.assign({}, ...gasPrices);
    }
    catch (error) {
        console.error("Error getting gas prices:", error);
        throw error;
    }
}
