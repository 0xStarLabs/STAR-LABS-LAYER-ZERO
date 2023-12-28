import {Network, privateKeysRandom, Protocol} from "./utilities/interfaces.js";


// "merkly", "l2pass", "zerius", "l2telegraph"
export const protocols: Protocol[] = ["merkly", "l2pass", "zerius", "l2telegraph"];

// "polygon", "celo", "moonbeam", "moonriver", "conflux", "gnosis", "klaytn";
export const networks: Network[] = ["polygon", "celo", "moonbeam", "moonriver", "conflux", "gnosis", "klaytn"];
export const approve = true;

export const exchange = {
    withdraw: true,
    okxInfo: {
        OKX_API_KEY: 'key',
        OKX_SECRET_KEY: 'key',
        OKX_PASSPHRASE: 'password',
    },
    amounts: {
        polygon: [1.5, 2.1],
        celo: [1, 1.3],
        moonbeam: [0.8, 1.2],
        moonriver: [0.02, 0.04],
        conflux: [1, 1.8],
        klaytn: [1.5, 2],
    }
}

export const maxGasPrice = {
    moonbeam: 300,
    moonriver: 3,
    polygon: 300,
    gnosis: 20,
    celo: 20,
    conflux: 50,
    klaytn: 100,
}
export const iterationRange = [5, 10];

export const initializationTime = 10000;

export const pause = [300, 900];

// "shuffle", "order", "consecutive",
export const privateKeysRandomMod: privateKeysRandom = "shuffle";

export const order = [1, 7, 2]