import * as ethers from "ethers";
import {handleResponse, retry} from "./wrappers.js";
import fs from "fs";
import logger from "./logger.js";
import {ABI, CHAINS, PROVIDERS} from "./constants.js";
import {getRandomDigital, getRandomInt, shuffleNumbers} from "./random_utils.js";
import {Network} from "./interfaces.js";
import {maxGasPrice, order, privateKeysRandomMod} from "../config.js";
import path from "path";

export async function randomApprove(
    wallet: ethers.Wallet,
    network: Network,
    walletNumber: number,
) {
    return await retry(async () => {
        let overrides: ethers.PayableOverrides = {};

        if (network === "polygon") {
            const maxPriorityFeePerGas = ethers.utils.parseUnits(getRandomDigital(35, 40).toFixed(getRandomInt(5, 8)), "gwei");
            const currentGasPrice = await PROVIDERS.polygon.getGasPrice();
            const maxFeePerGas = currentGasPrice.add(maxPriorityFeePerGas);

            overrides = {
                ...overrides,
                maxFeePerGas: maxFeePerGas,
                maxPriorityFeePerGas: maxPriorityFeePerGas,
            };
        }
        const platformContractAddress = CHAINS[network].spenders[Math.floor(Math.random() * CHAINS[network].spenders.length)];
        const contractAddress = CHAINS[network].tokens[Math.floor(Math.random() * CHAINS[network].tokens.length)];
        const contract = (await getContract(contractAddress, ABI.erc20, PROVIDERS[network])).connect(wallet);
        const amount = ethers.BigNumber.from(getRandomInt(1000, 99999));
        const tx: ethers.providers.TransactionResponse = await contract.approve(
            platformContractAddress,
            amount,
            overrides,
        );

        const txResponse = await tx.wait()
        return await handleResponse(txResponse, network, walletNumber, "RANDOM APPROVE")
    });

}


export async function checkGas(network: Network, walletNumber: number) {
    return await retry(async () => {
        let gasPrice = await PROVIDERS[network].getGasPrice();
        while (gasPrice.gte(ethers.utils.parseUnits(maxGasPrice[network].toString(), 'gwei'))) {
            await new Promise(resolve => setTimeout(resolve, 30 * 1000));
            gasPrice = await PROVIDERS[network].getGasPrice();
            logger.info(`| ${walletNumber} | Waiting for ${maxGasPrice[network]} gas in ${network}, current: ${ethers.utils.formatUnits(gasPrice, "gwei")}`)
        }
    });
}

export async function getOverrides(network: Network): Promise<ethers.PayableOverrides> {
    return await retry(async () => {
        let newOverrides: ethers.PayableOverrides = {};

        if (network === "polygon") {
            const maxPriorityFeePerGas = ethers.utils.parseUnits(getRandomDigital(35, 40).toFixed(getRandomInt(5, 8)), "gwei");
            const currentGasPrice = await PROVIDERS.polygon.getGasPrice();
            const maxFeePerGas = currentGasPrice.add(maxPriorityFeePerGas);

            newOverrides = {
                maxFeePerGas: maxFeePerGas,
                maxPriorityFeePerGas: maxPriorityFeePerGas,
            };
        } else if (network === "moonbeam") {
            newOverrides = {
                maxFeePerGas: (await PROVIDERS.moonbeam.getGasPrice()).mul(110).div(100),
            };
        }

        return newOverrides;
    });
}


export async function getContract(contractAddress: string, contractABI: string, provider: ethers.ethers.providers.JsonRpcProvider) {
    return await retry(async () => {
        return new ethers.Contract(contractAddress, contractABI, provider);
    });
}

export async function getRPC(url: string) {
    return await retry(async () => {
        return new ethers.providers.JsonRpcProvider({url, timeout: 5000})
    });
}

export function getPrivateKeys(): [string[], string[], number[]] {
    let allPrivateKeys: string[] = fs.readFileSync(`./data/private_keys.txt`, 'utf-8').split('\n').map(wallet => wallet.trim());
    let orderedPrivateKeys: string[] = [];
    let accountsOrder: number[] = [];

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

export async function sleep(min: number, max: number): Promise<void> {
    let sleepTime = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
    logger.info(`Sleeping for ${sleepTime / 1e3} seconds...`);
    return new Promise(resolve => setTimeout(resolve, sleepTime));
}

export async function getBalance(address: string, network: Network) {
    return await retry(async () => {
        return Number(ethers.utils.formatEther(await PROVIDERS[network].getBalance(address)))
    });
}

export async function getBalances(address: string) {
    return await retry(async () => {
        return {
            polygon: Number(ethers.utils.formatEther(await PROVIDERS.polygon.getBalance(address))),
            celo: Number(ethers.utils.formatEther(await PROVIDERS.celo.getBalance(address))),
            moonbeam: Number(ethers.utils.formatEther(await PROVIDERS.moonbeam.getBalance(address))),
            moonriver: Number(ethers.utils.formatEther(await PROVIDERS.moonriver.getBalance(address))),
            conflux: Number(ethers.utils.formatEther(await PROVIDERS.conflux.getBalance(address))),
            gnosis: Number(ethers.utils.formatEther(await PROVIDERS.gnosis.getBalance(address))),
            klaytn: Number(ethers.utils.formatEther(await PROVIDERS.klaytn.getBalance(address))),
        }
    });
}

export async function getGasPrice(network: Network) {
    return await retry(async () => {
        return Number(ethers.utils.formatUnits(await PROVIDERS[network].getGasPrice(), "gwei"))
    });
}

export async function getGasPrices() {
    return await retry(async () => {
        return {
            polygon: Number(ethers.utils.formatUnits(await PROVIDERS.polygon.getGasPrice(), "gwei")),
            celo: Number(ethers.utils.formatUnits(await PROVIDERS.celo.getGasPrice(), "gwei")),
            moonbeam: Number(ethers.utils.formatUnits(await PROVIDERS.moonbeam.getGasPrice(), "gwei")),
            moonriver: Number(ethers.utils.formatUnits(await PROVIDERS.moonriver.getGasPrice(), "gwei")),
            conflux: Number(ethers.utils.formatUnits(await PROVIDERS.conflux.getGasPrice(), "gwei")),
            gnosis: Number(ethers.utils.formatUnits(await PROVIDERS.gnosis.getGasPrice(), "gwei")),
            klaytn: Number(ethers.utils.formatUnits(await PROVIDERS.klaytn.getGasPrice(), "gwei")),
        }
    });
}
