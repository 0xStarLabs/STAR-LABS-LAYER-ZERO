import { ethers } from "ethers";
import { getRandomDigital, getRandomInt } from "../utilities/random_utils.js";
import { handleResponse, retry } from "../utilities/wrappers.js";
import logger from "../utilities/logger.js";
import { CHAINS, ZERO_ADDRESS } from "../utilities/constants.js";
import { getOverrides } from "../utilities/common.js";
export class L2PassRefuel {
    wallet;
    address;
    network;
    walletNumber;
    contract;
    constructor(wallet, network, walletNumber) {
        this.wallet = wallet;
        this.address = wallet.address;
        this.network = network;
        this.walletNumber = walletNumber;
        this.contract = CHAINS[this.network].protocols.l2pass.contract.connect(this.wallet);
    }
    async getInfo() {
        try {
            return await retry(async () => {
                const dstChainId = CHAINS[this.network].protocols.l2pass.dstChains[Math.floor(Math.random() * CHAINS[this.network].protocols.l2pass.dstChains.length)];
                const amountWei = ethers.utils.parseEther((getRandomDigital(0.0000001, 0.0000008)).toFixed(getRandomInt(12, 18)));
                let swapInfo = {
                    dstChainId: dstChainId,
                    nativeForDst: amountWei,
                    value: (await this.contract.estimateGasRefuelFee(dstChainId, amountWei, this.address, false))[0]
                };
                return swapInfo;
            });
        }
        catch (error) {
            throw new Error("Error in L2PassRefuel - getInfo: " + error.message);
        }
    }
    async refuel() {
        try {
            return await retry(async () => {
                const swapInfo = await this.getInfo();
                let overrides = {
                    ...await getOverrides(this.network),
                    value: swapInfo.value,
                };
                const tx = await this.contract.gasRefuel(swapInfo.dstChainId, ZERO_ADDRESS, swapInfo.nativeForDst, this.address, overrides);
                const txResponse = await tx.wait();
                return await handleResponse(txResponse, this.network, this.walletNumber, "L2PASS REFUEL");
            });
        }
        catch (error) {
            logger.error(`| ${this.walletNumber} | Error in L2PassRefuel - refuel:`, error.message);
        }
    }
}
