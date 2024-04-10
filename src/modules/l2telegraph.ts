import {ethers} from "ethers";
import {generateRandomString} from "../utilities/random_utils.js";
import {handleResponse, retry} from "../utilities/wrappers.js";
import logger from "../utilities/logger.js";
import {CHAINS} from "../utilities/constants.js";
import {Network} from "../utilities/interfaces.js";
import {getOverrides, sleep} from "../utilities/common.js";

export class L2Telegraph {
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
        this.contract = CHAINS[this.network].protocols.l2telegraph.contract.connect(this.wallet);
    }

    private async getInfo() {
        try {
            return await retry(async () => {
                const dstChainId = CHAINS[this.network].protocols.l2telegraph.dstChains[Math.floor(Math.random() * CHAINS[this.network].protocols.l2telegraph.dstChains.length)];
                const payload = ethers.utils.defaultAbiCoder.encode(["uint8", "string"], [2, "okokokokokokokokokokokokokokokokokokokok"]);
                const adapterParams = ethers.utils.solidityPack(["uint16", "uint"], [2, 250000])
                const message = generateRandomString();

                let trustedRemote = ethers.utils.solidityPack(
                    ['address','address'],
                    [this.contract.address, this.contract.address]
                );

                const swapInfo = {
                    destChainId: dstChainId,
                    message: message,
                    _destination: trustedRemote,
                    value: (await this.contract.estimateFees(dstChainId, this.contract.address, payload, false, adapterParams))[0]
                };
                return swapInfo;
            });
        } catch (error: any) {
            throw new Error("Error in L2Telegraph - getInfo: " + error.message);
        }
    }

    async sendMessage() {
        try {
            return await retry(async () => {
                const swapInfo = await this.getInfo();

                let overrides: ethers.PayableOverrides = {
                    ...await getOverrides(this.network),
                    value: swapInfo.value,
                };

                // error here
                const tx = await this.contract.sendMessage(
                    swapInfo.message,
                    swapInfo.destChainId,
                    swapInfo._destination,
                    overrides,
                );

                const txResponse = await tx.wait();
                console.log(txResponse)
                return await handleResponse(txResponse, this.network, this.walletNumber, "L2TELEGRAPH MESSAGE")
            });
        } catch (error: any) {
            logger.error(`| ${this.walletNumber} | Error in L2Telegraph - refuel:`, error.message);
        }
    }
}