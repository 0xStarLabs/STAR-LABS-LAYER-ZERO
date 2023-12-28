import {ethers} from "ethers";
import {getRandomDigital, getRandomInt} from "../utilities/random_utils.js";
import {handleResponse, retry} from "../utilities/wrappers.js";
import logger from "../utilities/logger.js";
import {CHAINS, ZERIUS_REFUEL_CONTRACTS} from "../utilities/constants.js";
import {Network} from "../utilities/interfaces.js";
import {getOverrides} from "../utilities/common.js";

export class ZeriusRefuel {
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
        this.contract = CHAINS[this.network].protocols.zerius.contract.connect(this.wallet);
    }

    private async getInfo() {
        try {
            return await retry(async () => {
                const dstChainId = CHAINS[this.network].protocols.zerius.dstChains[Math.floor(Math.random() * CHAINS[this.network].protocols.zerius.dstChains.length)];
                const amountWei = ethers.utils.parseEther((getRandomDigital(0.0000001, 0.0000008)).toFixed(getRandomInt(12, 18)));
                const minDstGas: ethers.BigNumber = (await this.contract.minDstGasLookup(dstChainId, 0)).toHexString().substring(2);
                const dstAddress = ZERIUS_REFUEL_CONTRACTS[dstChainId]
                const adapterParams = ethers.utils.defaultAbiCoder.encode(
                    ["uint256"],
                    [amountWei]
                ).substring(2);

                let swapInfo = {
                    dstChainId: dstChainId,
                    toAddress: dstAddress,
                    adapterParams: `0x00020000000000000000000000000000000000000000000000000000000000${minDstGas}${adapterParams}${this.address.substring(2)}`,
                    value: (await this.contract.estimateSendFee(dstChainId, this.address, `0x00020000000000000000000000000000000000000000000000000000000000${minDstGas}${adapterParams}${this.address.substring(2)}`))[0]
                };
                return swapInfo;
            });
        } catch (error: any) {
            throw new Error("Error in ZeriusRefuel - getInfo: " + error.message);
        }
    }

    async refuel() {
        try {
            return await retry(async () => {
                const swapInfo = await this.getInfo();

                let overrides: ethers.PayableOverrides = {
                    ...await getOverrides(this.network),
                    value: swapInfo.value,
                };
                const tx = await this.contract.refuel(
                    swapInfo.dstChainId,
                    swapInfo.toAddress,
                    swapInfo.adapterParams,
                    overrides,
                );

                const txResponse = await tx.wait();
                return await handleResponse(txResponse, this.network, this.walletNumber, "ZERIUS REFUEL")
            });
        } catch (error: any) {
            logger.error(`| ${this.walletNumber} | Error in ZeriusRefuel - refuel:`, error.message);
        }
    }
}