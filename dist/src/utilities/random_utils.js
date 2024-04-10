import { CHAINS } from "./constants.js";
import { maxGasPrice, networks, protocols } from "../config.js";
import { getGasPrices } from "./common.js";
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getRandomDigital(min, max) {
    const randomFraction = Math.random();
    const randomValueInRange = min + randomFraction * (max - min);
    return parseFloat(randomValueInRange.toFixed(18));
}
export async function getRandomNetworkAndProtocol(balances) {
    // Retrieve current gas prices
    const gasPrices = await getGasPrices();
    // Filter networks based on balance and protocol availability
    const eligibleNetworks = [];
    // Перебор каждой сети в массиве networks
    for (const network of networks) {
        // Получение баланса для текущей сети
        const balance = balances[network];
        // Получение минимального баланса для текущей сети из CHAINS
        const minBalance = CHAINS[network].minBalance;
        // Получение списка имен для текущей сети из CHAINS
        const networkNames = CHAINS[network].names;
        // Проверка, что баланс больше минимального и сеть поддерживает хотя бы один протокол
        if (balance > minBalance && networkNames.some(name => protocols.includes(name))) {
            // Если условия удовлетворены, добавление сети в список eligibleNetworks
            eligibleNetworks.push(network);
        }
    }
    // Return null if no networks are eligible
    if (eligibleNetworks.length === 0) {
        return null;
    }
    // Filter eligible networks further based on gas price
    const lowGasPriceNetworks = eligibleNetworks.filter(network => gasPrices[network] < maxGasPrice[network]);
    let selectedNetwork;
    // Select from networks with low gas price if available, otherwise select from all eligible networks
    if (lowGasPriceNetworks.length > 0) {
        const randomIndex = Math.floor(Math.random() * lowGasPriceNetworks.length);
        selectedNetwork = lowGasPriceNetworks[randomIndex];
    }
    else {
        const randomIndex = Math.floor(Math.random() * eligibleNetworks.length);
        selectedNetwork = eligibleNetworks[randomIndex];
    }
    // Filter the protocols array to include only those present in CHAINS[selectedNetwork].names
    const availableProtocols = protocols.filter(protocol => CHAINS[selectedNetwork].names.includes(protocol));
    // Randomly select a protocol
    const randomProtocolIndex = Math.floor(Math.random() * availableProtocols.length);
    const selectedProtocol = availableProtocols[randomProtocolIndex];
    return { network: selectedNetwork, protocol: selectedProtocol };
}
export function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
export function shuffleNumbers(min, max) {
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
export function generateRandomString(minLength = 20, maxLength = 40) {
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
