import logger from "./logger.js";
import { EXPLORERS } from "./constants.js";
export async function handleResponse(receipt, network, walletNumber, message // Optional string argument
) {
    return await retry(async () => {
        try {
            if (receipt && receipt.status === 1) {
                const logMessage = message ? `${message} | ` : '';
                logger.success(`| ${walletNumber} | ${logMessage}${EXPLORERS[network]}${receipt.transactionHash}`);
                return [receipt, true];
            }
            else {
                const errorMessage = `| ${walletNumber} | Transaction failed`;
                logger.error(errorMessage);
                throw new Error(errorMessage);
            }
        }
        catch (error) {
            const errorMessage = `| ${walletNumber} | Error while sending transaction: ${error.message}`;
            logger.error(errorMessage);
            throw new Error(errorMessage);
        }
    });
}
export async function retry(fn, retries = 100, delay = 5000) {
    let lastError = null;
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        }
        catch (err) {
            lastError = err;
            if (i < retries - 1) {
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }
    throw lastError ?? new Error("Retries exhausted with unknown error");
}
