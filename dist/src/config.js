// "merkly", "l2pass", "zerius", "l2telegraph", "gazZip"
export const protocols = ["gazZip"];
// "polygon", "celo", "moonbeam", "moonriver", "conflux", "gnosis", "klaytn";
export const networks = ["celo"];
export const approve = false;
export const exchange = {
    withdraw: true,
    okxInfo: {
        OKX_API_KEY: '51848531-6d0a-4555-85da-31bde0d78160',
        OKX_SECRET_KEY: '2178FBFE2EFD9ABE1961E1F4486A4258',
        OKX_PASSPHRASE: 'Paramonow14!',
    },
    amounts: {
        polygon: [1.2, 2.1],
        celo: [1, 1.3],
        moonbeam: [0.8, 1.2],
        moonriver: [0.02, 0.04],
        klaytn: [1.2, 2],
    }
};
export const maxGasPrice = {
    moonbeam: 300,
    moonriver: 3,
    polygon: 300,
    gnosis: 20,
    celo: 20,
    klaytn: 100,
};
export const iterationRange = [50, 100];
export const initializationTime = 10;
export const pause = [100000, 100005];
// "shuffle", "order", "consecutive",
export const privateKeysRandomMod = "shuffle";
export const order = [1];
