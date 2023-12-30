import {CHAINS} from "./constants.js";
import {Balances, Network, Protocol} from "./interfaces.js";
import {maxGasPrice, networks, protocols} from "../config.js";
import {getGasPrices} from "./common.js";

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function getRandomDigital(min: number, max: number) {
    const randomFraction = Math.random();
    const randomValueInRange = min + randomFraction * (max - min);
    return parseFloat(randomValueInRange.toFixed(18));
}

export async function getRandomNetworkAndProtocol(balances: Balances): Promise<{ network: Network, protocol: Protocol } | null> {
    // Retrieve current gas prices
    const gasPrices = await getGasPrices();

    // Filter networks based on balance and protocol availability
    const eligibleNetworks: Network[] = networks
        .filter(network =>
            balances[network] > CHAINS[network].minBalance &&
            CHAINS[network].names.some(name => protocols.includes(name))
        );

    // Return null if no networks are eligible
    if (eligibleNetworks.length === 0) {
        return null;
    }

    // Filter eligible networks further based on gas price
    const lowGasPriceNetworks: Network[] = eligibleNetworks.filter(network => gasPrices[network] < maxGasPrice[network]);

    let selectedNetwork: Network;

    // Select from networks with low gas price if available, otherwise select from all eligible networks
    if (lowGasPriceNetworks.length > 0) {
        const randomIndex = Math.floor(Math.random() * lowGasPriceNetworks.length);
        selectedNetwork = lowGasPriceNetworks[randomIndex];
    } else {
        const randomIndex = Math.floor(Math.random() * eligibleNetworks.length);
        selectedNetwork = eligibleNetworks[randomIndex];
    }

    // Filter the protocols array to include only those present in CHAINS[selectedNetwork].names
    const availableProtocols: Protocol[] = protocols.filter(protocol => CHAINS[selectedNetwork].names.includes(protocol));

    // Randomly select a protocol
    const randomProtocolIndex = Math.floor(Math.random() * availableProtocols.length);
    const selectedProtocol: Protocol = availableProtocols[randomProtocolIndex];

    return { network: selectedNetwork, protocol: selectedProtocol };
}

export const getRandomElement = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

export function shuffleNumbers(min: number, max: number): number[] {
    if (min > max) {
        throw new Error('Minimum value should not be greater than maximum value.');
    }

    // Create an array from min to max
    const range = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    // Shuffle the array using the Fisher-Yates algorithm
    for (let i = range.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [range[i], range[j]] = [range[j], range[i]];
    }

    return range;
}



export function generateRandomString(minLength: number = 20, maxLength: number = 40): string {
    const length: number = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
