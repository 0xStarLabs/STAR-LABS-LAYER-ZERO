import {ethers} from "ethers";
import {Okx} from "./modules/okx.js";
import logger from "./utilities/logger.js";
import {retry} from "./utilities/wrappers.js";
import {MerklyRefuel} from "./modules/merkly.js";
import {ZeriusRefuel} from "./modules/zerius.js";
import {L2PassRefuel} from "./modules/l2pass.js";
import {L2Telegraph} from "./modules/l2telegraph.js";
import {PROVIDERS} from "./utilities/constants.js";
import {Balances, Network, Protocol} from "./utilities/interfaces.js";
import {getRandomInt, getRandomNetworkAndProtocol} from "./utilities/random_utils.js";
import {randomApprove, getBalances, getPrivateKeys, sleep, checkGas} from "./utilities/common.js";
import {approve, exchange, initializationTime, iterationRange, pause, protocols} from "./config.js";
import {GazZip} from "./modules/gaz_zip.js";

class Main {
    private readonly privateKeys: string[];
    private readonly notShuffledKeys: string[];
    private readonly accountsOrder: number[]

    constructor() {
        [this.privateKeys, this.notShuffledKeys, this.accountsOrder] = getPrivateKeys();

    }

    private async sendRandomTransaction(protocol: Protocol, wallet: ethers.Wallet, network: Network, walletNumber: number) {
        try {
            return await retry(async () => {
                switch (protocol) {
                    case "merkly":
                        const merkly = new MerklyRefuel(wallet, network, walletNumber);
                        await merkly.refuel();
                        break;
                    case "zerius":
                        const zerius = new ZeriusRefuel(wallet, network, walletNumber);
                        await zerius.refuel();
                        break;
                    case "l2pass":
                        const l2pass = new L2PassRefuel(wallet, network, walletNumber);
                        await l2pass.refuel();
                        break;
                    case "l2telegraph":
                        const l2telegraph = new L2Telegraph(wallet, network, walletNumber);
                        await l2telegraph.sendMessage();
                        break;
                    case "gazZip":
                        const gazZip = new GazZip(wallet, network, walletNumber);
                        await gazZip.refuel();
                        break;
                    default:
                        throw new Error("No protocol chosen");
                }
            });
        } catch (error: any) {
            throw new Error("sendRandomTransaction" + error.message);
        }
    }

    private async runThread(wallet: ethers.Wallet, walletNumber: number) {
        logger.info(`| ${walletNumber} | ${wallet.address} - Running thread`);
        let balances: Balances = await getBalances(wallet.address);
        if (exchange.withdraw) {
            const okx = new Okx(wallet.address, balances, walletNumber);
            await okx.withdraw();
        }
        const randomTimes = getRandomInt(iterationRange[0], iterationRange[1]);
        for (let i = 1; i <= randomTimes; i++) {
            logger.info(`| ${walletNumber} | ${wallet.address} Starting Iteration ${i} - ${randomTimes}`);
            balances = await getBalances(wallet.address);
            const randomPick: { network: Network; protocol: Protocol } | null = await getRandomNetworkAndProtocol(balances);

            if (randomPick !== null) {
                const provider = await PROVIDERS[randomPick.network];
                wallet = wallet.connect(provider);
                await checkGas(randomPick.network, walletNumber);
                await this.sendRandomTransaction(randomPick.protocol, wallet, randomPick.network, walletNumber);
                if (approve) {
                    const randomTimes = getRandomInt(1, 2);
                    for (let i = 0; i < randomTimes; i++) {
                        await sleep(pause[0] / 10, pause[1] / 10);
                        await randomApprove(wallet, randomPick.network, walletNumber);
                    }
                }
                await sleep(pause[0], pause[1]);

            } else {
                logger.error("Error: No eligible networks found. Either all networks have balances below the minimum required or none are compatible with the provided configuration.");
            }
        }
    }

    async execute() {
        logger.info(`Accounts Order: ${this.accountsOrder}\n`);

        const promises = [];
        for (let privateKey of this.privateKeys) {
            const wallet = new ethers.Wallet(privateKey);
            const walletNumber = this.notShuffledKeys.indexOf(privateKey) + 1
            // Create a promise for the thread execution
            const promise = this.runThread(wallet, walletNumber).then(() => {
                logger.success(`| ${walletNumber} | Thread completed`)
            });
            promises.push(promise);
            await sleep(initializationTime / (2 * this.privateKeys.length), initializationTime * 2 / this.privateKeys.length);
        }
        await Promise.all(promises);
    }
}

(async () => {
    try {
        const mainClass = new Main();
        await mainClass.execute();
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
