import {ethers} from "ethers";
import {getRandomDigital, getRandomInt} from "../utilities/random_utils.js";
import {handleResponse, retry} from "../utilities/wrappers.js";
import logger from "../utilities/logger.js";
import {CHAINS} from "../utilities/constants.js";
import {Network} from "../utilities/interfaces.js";
import {getOverrides, sleep} from "../utilities/common.js";

export class GazZip {
    private readonly wallet: ethers.Wallet;
    private readonly address: string;
    private readonly network: Network;
    private readonly walletNumber: number;
    private contract: ethers.Contract;

    constructor(wallet: ethers.Wallet, network: Network, walletNumber: number) {
        this.wallet = wallet;
        this.address = wallet.address;
        this.network = network;
        this.walletNumber = walletNumber;
        this.contract = CHAINS[this.network].protocols.gazZip.contract.connect(this.wallet);
    }

    async refuel() {
        try {
            return await retry(async () => {
                const currentNetwork = this.network.toLowerCase();

                const availableNetworks = Object.entries(chainIDsGasZip).filter(([networkName]) => networkName.toLowerCase() !== currentNetwork);

                const randomEntry = availableNetworks[Math.floor(Math.random() * availableNetworks.length)];
                const randomNetwork = { networkName: randomEntry[0], networkID: randomEntry[1] };

                const networkID = randomNetwork.networkID + 30000;

                // Ensure that we are working with integer values only
                const amountWei = ethers.utils.parseEther((getRandomDigital(0.0000001, 0.0000008)).toFixed(getRandomInt(12, 18)));

                // Correctly call a read-only contract method without using .call()

                const adapterParamsHex = await this.contract.createNativeDropOption(networkID, amountWei, this.address);
                const adapterParams = [adapterParamsHex]; // Оставляем в массиве для совместимости с интерфейсом функции

                const depositParam = await this.createDataV2(networkID, amountWei);

                const feesSum = await this.contract.estimateFees([networkID], ['0x'], adapterParams);

                // Parse feesSum directly if it's already a BigNumber or convert it if necessary
                const feesTotal = ethers.utils.parseUnits(feesSum.toString(), 'wei');

                const transactionDetails = {
                    from: this.address,
                    value: feesTotal,
                    nonce: await this.wallet.getTransactionCount(),
                    // Make sure to include gas limit and gas price if necessary
                };

                const tx = await this.contract.sendDeposits(depositParam, this.address, transactionDetails);

                const txResponse = await tx.wait();

                return await handleResponse(txResponse, this.network, this.walletNumber, `GAZ ZIP | ${this.network} -> ${randomNetwork.networkName}`);
            });
        } catch (error: any) {
            logger.error(`| ${this.walletNumber} | Error in GazZip - refuel:`, error.message);
        }
    }

    private async createDataV2(chainId: number, value: ethers.BigNumber): Promise<string[]> {
        const depositParam = ethers.BigNumber.from(chainId).shl(224);
        const mask = ethers.BigNumber.from("1").shl(128).sub(1);
        const modifiedValue = value.and(mask); // Ensure value fits into 128 bits
        const result = depositParam.or(modifiedValue);

        const resultHexString = result.toHexString(); // '0xc60000000000000000000000000000000000000000000000377d8576e0'
        const resultBigInt = BigInt(resultHexString); // Преобразует шестнадцатеричную строку в BigInt

        return [resultBigInt.toString()];
    }
}

let chainIDsGasZip = {
    Gnosis: 145,
    Core: 153,
    Celo: 125,
    Moonriver: 167,
    Nova: 175,
    Fuse: 138,
    Beam: 198,
    Klaytn: 150,
    Loot: 197,
    Viction: 196,
}
