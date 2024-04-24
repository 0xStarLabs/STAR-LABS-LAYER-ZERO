import {Network, privateKeysRandom, Protocol} from "./utilities/interfaces.js";


// "merkly", "l2pass", "zerius", "l2telegraph", "gazZip"
export const protocols: Protocol[] = ["merkly", "l2pass", "zerius", "l2telegraph", "gazZip"];

// "polygon", "celo", "moonbeam", "moonriver", "conflux", "gnosis", "klaytn";
export const networks: Network[] = [ "polygon", "celo", "moonbeam", "moonriver", "gnosis", "klaytn"];
export const approve = false;

export const exchange = {
    withdraw: true,
    okxInfo: {
        OKX_API_KEY: '',
        OKX_SECRET_KEY: '',
        OKX_PASSPHRASE: '',
    },
    amounts: {
        polygon: [1.2, 2.1],
        celo: [1, 1.3],
        moonbeam: [0.8, 1.2],
        moonriver: [0.02, 0.04],
        klaytn: [1.2, 2],
    }
}

export const maxGasPrice = {
    moonbeam: 300,
    moonriver: 3,
    polygon: 300,
    gnosis: 20,
    celo: 20,
    klaytn: 100,
}
export const iterationRange = [50, 100];

export const initializationTime = 10000;

export const pause = [60000, 100005];

// "shuffle", "order", "consecutive",
export const privateKeysRandomMod: privateKeysRandom = "shuffle";

export const order = [1]
