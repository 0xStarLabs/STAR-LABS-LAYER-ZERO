import ccxt from 'ccxt';
import logger from "../utilities/logger.js";
import { getRandomDigital, getRandomInt } from "../utilities/random_utils.js";
import { getBalance, sleep } from "../utilities/common.js";
import { CHAINS, RPC_URLS, TICKERS } from "../utilities/constants.js";
import { exchange, networks } from "../config.js";
import * as ethers from "ethers";
export class Okx {
    okx;
    address;
    balances;
    walletNumber;
    constructor(address, balances, walletNumber) {
        this.address = address;
        this.balances = balances;
        this.walletNumber = walletNumber;
        this.okx = new ccxt.okx({
            apiKey: exchange.okxInfo.OKX_API_KEY,
            secret: exchange.okxInfo.OKX_SECRET_KEY,
            password: exchange.okxInfo.OKX_PASSPHRASE
        });
    }
    async withdraw() {
        for (let i = TICKERS.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [TICKERS[i], TICKERS[j]] = [TICKERS[j], TICKERS[i]];
        }
        for (const ticker of TICKERS) {
            if (networks.includes(ticker.name)) {
                let retry = true;
                while (retry) {
                    try {
                        if (this.balances[ticker.name] > CHAINS[ticker.name].minBalance) {
                            break;
                        }
                        const amountToWithdraw = Number(getRandomDigital(ticker.amount[0], ticker.amount[1]).toFixed(getRandomInt(5, 8)));
                        logger.info(`| ${this.walletNumber} | Trying to withdraw ${amountToWithdraw} - ${ticker.symbol}`);
                        await this.okx.withdraw(ticker.symbol, amountToWithdraw.toString(), this.address, undefined, {
                            'network': ticker.network,
                            'fee': ticker.fee,
                            "pwd": '-'
                        });
                        let updatedBalance;
                        do {
                            updatedBalance = Number(parseFloat(ethers.utils.formatEther(await getBalance(RPC_URLS[ticker.name][0], this.address))).toFixed(getRandomInt(5, 8)));
                            await sleep(60, 120);
                        } while (updatedBalance.toFixed(5) == this.balances[ticker.name].toFixed(5));
                        logger.success(`| ${this.walletNumber} | Successfully withdrawn ${amountToWithdraw} - ${ticker.symbol}`);
                        retry = false;
                    }
                    catch (error) {
                        if (error instanceof ccxt.InsufficientFunds || error['err-code'] === 'dw-insufficient-balance') {
                            logger.error('Insufficient balance, retrying withdrawal');
                            await sleep(300, 900);
                        }
                        else if (error.code === '58214' || error.message.includes('58214')) {
                            logger.error('Withdrawal suspended due to maintenance. Retrying...');
                            await sleep(300, 900);
                        }
                        else {
                            logger.error(`Unexpected error: ${error.message}`);
                            await sleep(300, 900);
                        }
                    }
                }
            }
        }
    }
}
