import {ethers} from "ethers";

export type Network = "polygon" | "moonbeam" | "moonriver" | "celo" | "klaytn" | "gnosis";
export type Protocol = "zerius" | "merkly" | "l2pass" | "l2telegraph" | "gazZip";
export type privateKeysRandom = "shuffle" | "order" | "consecutive";

export interface Balances {
    moonbeam: number,
    moonriver: number,
    polygon: number,
    celo: number,
    gnosis: number,
    klaytn: number,
}

export interface Ticker {
    name: Network,
    network: string,
    symbol: string,
    fee: number,
    amount: number[]
}

export interface Chain {
    minBalance: number;
    names: Protocol[],
    protocols: {
        [key: string]: {
            contract: ethers.Contract;
            dstChains: number[];
        };
    };
    spenders: string[];
    tokens: string[];
}