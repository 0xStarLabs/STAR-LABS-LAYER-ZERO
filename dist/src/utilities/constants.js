import { getContract, getRPC } from "./common.js";
import { exchange } from "../config.js";
export const RPC_URLS = {
    polygon: ['https://rpc.ankr.com/polygon/0d2f0e9eeba02abecd1669512f8aefbbc9806653c49922a03e8dcc4919629053'],
    celo: ['https://rpc.ankr.com/celo/0d2f0e9eeba02abecd1669512f8aefbbc9806653c49922a03e8dcc4919629053'],
    moonbeam: ['https://rpc.ankr.com/moonbeam/0d2f0e9eeba02abecd1669512f8aefbbc9806653c49922a03e8dcc4919629053'],
    moonriver: ['https://moonriver.public.blastapi.io'],
    gnosis: ['https://rpc.ankr.com/gnosis/0d2f0e9eeba02abecd1669512f8aefbbc9806653c49922a03e8dcc4919629053'],
    klaytn: ['https://rpc.ankr.com/klaytn/0d2f0e9eeba02abecd1669512f8aefbbc9806653c49922a03e8dcc4919629053'],
};
export const PROVIDERS = {
    get polygon() {
        return getRPC(RPC_URLS.polygon, "polygon", 137);
    },
    get celo() {
        return getRPC(RPC_URLS.celo, "celo", 42220);
    },
    get moonbeam() {
        return getRPC(RPC_URLS.moonbeam, "moonbeam", 1284);
    },
    get moonriver() {
        return getRPC(RPC_URLS.moonriver, "moonriver", 1285);
    },
    get gnosis() {
        return getRPC(RPC_URLS.gnosis, "gnosis", 100);
    },
    get klaytn() {
        return getRPC(RPC_URLS.klaytn, "klaytn", 8217);
    }
};
export const TICKERS = [
    {
        name: 'polygon',
        network: "Polygon",
        symbol: "MATIC",
        fee: 0.1,
        amount: exchange.amounts.polygon,
    },
    {
        name: 'celo',
        network: "Celo",
        symbol: "CELO",
        fee: 0.0008,
        amount: exchange.amounts.celo,
    },
    {
        name: 'moonbeam',
        network: "Moonbeam",
        symbol: "GLMR",
        fee: 0.01,
        amount: exchange.amounts.moonbeam,
    },
    {
        name: 'moonriver',
        network: "Moonriver",
        symbol: "MOVR",
        fee: 0.0001,
        amount: exchange.amounts.moonriver,
    },
    {
        name: 'klaytn',
        network: "Klaytn",
        symbol: "KLAY",
        fee: 0.004,
        amount: exchange.amounts.klaytn,
    }
];
export const ABI = {
    erc20: '[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"decimals_","type":"uint8"}],"name":"setupDecimals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]',
    merkly: '[{"inputs":[{"internalType":"address","name":"_lzEndpoint","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"indexed":false,"internalType":"uint64","name":"_nonce","type":"uint64"},{"indexed":false,"internalType":"bytes","name":"_payload","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"_reason","type":"bytes"}],"name":"MessageFailed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"indexed":false,"internalType":"uint64","name":"_nonce","type":"uint64"},{"indexed":false,"internalType":"bytes32","name":"_payloadHash","type":"bytes32"}],"name":"RetryMessageSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"_type","type":"uint16"},{"indexed":false,"internalType":"uint256","name":"_minDstGas","type":"uint256"}],"name":"SetMinDstGas","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"precrime","type":"address"}],"name":"SetPrecrime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_remoteChainId","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"_path","type":"bytes"}],"name":"SetTrustedRemote","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_remoteChainId","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"_remoteAddress","type":"bytes"}],"name":"SetTrustedRemoteAddress","type":"event"},{"inputs":[],"name":"DEFAULT_PAYLOAD_SIZE_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NO_EXTRA_GAS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PT_SEND","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"bytes","name":"_toAddress","type":"bytes"},{"internalType":"bytes","name":"_adapterParams","type":"bytes"}],"name":"bridgeGas","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"bytes","name":"payload","type":"bytes"},{"internalType":"bytes","name":"_adapterParams","type":"bytes"}],"name":"estimateSendFee","outputs":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"zroFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"uint64","name":"","type":"uint64"}],"name":"failedMessages","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"}],"name":"forceResumeReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_version","type":"uint16"},{"internalType":"uint16","name":"_chainId","type":"uint16"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"_configType","type":"uint256"}],"name":"getConfig","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_remoteChainId","type":"uint16"}],"name":"getTrustedRemoteAddress","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"}],"name":"isTrustedRemote","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lzEndpoint","outputs":[{"internalType":"merklyContract ILayerZeroEndpoint","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"internalType":"uint64","name":"_nonce","type":"uint64"},{"internalType":"bytes","name":"_payload","type":"bytes"}],"name":"lzReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"minDstGasLookup","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"internalType":"uint64","name":"_nonce","type":"uint64"},{"internalType":"bytes","name":"_payload","type":"bytes"}],"name":"nonblockingLzReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"payloadSizeLimitLookup","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"precrime","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"internalType":"uint64","name":"_nonce","type":"uint64"},{"internalType":"bytes","name":"_payload","type":"bytes"}],"name":"retryMessage","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_version","type":"uint16"},{"internalType":"uint16","name":"_chainId","type":"uint16"},{"internalType":"uint256","name":"_configType","type":"uint256"},{"internalType":"bytes","name":"_config","type":"bytes"}],"name":"setConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"uint16","name":"_packetType","type":"uint16"},{"internalType":"uint256","name":"_minGas","type":"uint256"}],"name":"setMinDstGas","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"uint256","name":"_size","type":"uint256"}],"name":"setPayloadSizeLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_precrime","type":"address"}],"name":"setPrecrime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_version","type":"uint16"}],"name":"setReceiveVersion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_version","type":"uint16"}],"name":"setSendVersion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_remoteChainId","type":"uint16"},{"internalType":"bytes","name":"_path","type":"bytes"}],"name":"setTrustedRemote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_remoteChainId","type":"uint16"},{"internalType":"bytes","name":"_remoteAddress","type":"bytes"}],"name":"setTrustedRemoteAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"trustedRemoteLookup","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"useCustomAdapterParams","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]',
    l2pass: '[{"inputs":[{"internalType":"address","name":"lzEndpoint_","type":"address"},{"internalType":"uint256","name":"gasRefuelPrice_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint16","name":"dstChainId","type":"uint16"},{"internalType":"uint256","name":"nativeForDst","type":"uint256"},{"internalType":"address","name":"addressOnDst","type":"address"},{"internalType":"bool","name":"useZro","type":"bool"}],"name":"estimateGasRefuelFee","outputs":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"zroFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"dstChainId","type":"uint16"},{"internalType":"address","name":"zroPaymentAddress","type":"address"},{"internalType":"uint256","name":"nativeForDst","type":"uint256"},{"internalType":"address","name":"addressOnDst","type":"address"}],"name":"gasRefuel","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"gasRefuelPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"uint64","name":"","type":"uint64"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"lzReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gasRefuelPrice_","type":"uint256"}],"name":"setGasRefuelPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
    zerius: '[{"inputs":[{"internalType":"address","name":"_lzEndpoint","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"indexed":false,"internalType":"uint64","name":"_nonce","type":"uint64"},{"indexed":false,"internalType":"bytes","name":"_payload","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"_reason","type":"bytes"}],"name":"MessageFailed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"indexed":false,"internalType":"uint64","name":"_nonce","type":"uint64"},{"indexed":false,"internalType":"bytes32","name":"_payloadHash","type":"bytes32"}],"name":"RetryMessageSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"_type","type":"uint16"},{"indexed":false,"internalType":"uint256","name":"_minDstGas","type":"uint256"}],"name":"SetMinDstGas","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"precrime","type":"address"}],"name":"SetPrecrime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_remoteChainId","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"_path","type":"bytes"}],"name":"SetTrustedRemote","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_remoteChainId","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"_remoteAddress","type":"bytes"}],"name":"SetTrustedRemoteAddress","type":"event"},{"inputs":[],"name":"DEFAULT_PAYLOAD_SIZE_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FUNCTION_TYPE_SEND","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"bytes","name":"payload","type":"bytes"},{"internalType":"bytes","name":"_adapterParams","type":"bytes"}],"name":"estimateSendFee","outputs":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"zroFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"uint64","name":"","type":"uint64"}],"name":"failedMessages","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"}],"name":"forceResumeReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_version","type":"uint16"},{"internalType":"uint16","name":"_chainId","type":"uint16"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"_configType","type":"uint256"}],"name":"getConfig","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_remoteChainId","type":"uint16"}],"name":"getTrustedRemoteAddress","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"}],"name":"isTrustedRemote","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lzEndpoint","outputs":[{"internalType":"contract ILayerZeroEndpoint","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"internalType":"uint64","name":"_nonce","type":"uint64"},{"internalType":"bytes","name":"_payload","type":"bytes"}],"name":"lzReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"minDstGasLookup","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"internalType":"uint64","name":"_nonce","type":"uint64"},{"internalType":"bytes","name":"_payload","type":"bytes"}],"name":"nonblockingLzReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"payloadSizeLimitLookup","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"precrime","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"bytes","name":"_toAddress","type":"bytes"},{"internalType":"bytes","name":"_adapterParams","type":"bytes"}],"name":"refuel","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"internalType":"uint64","name":"_nonce","type":"uint64"},{"internalType":"bytes","name":"_payload","type":"bytes"}],"name":"retryMessage","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_version","type":"uint16"},{"internalType":"uint16","name":"_chainId","type":"uint16"},{"internalType":"uint256","name":"_configType","type":"uint256"},{"internalType":"bytes","name":"_config","type":"bytes"}],"name":"setConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"uint16","name":"_packetType","type":"uint16"},{"internalType":"uint256","name":"_minGas","type":"uint256"}],"name":"setMinDstGas","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"uint256","name":"_size","type":"uint256"}],"name":"setPayloadSizeLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_precrime","type":"address"}],"name":"setPrecrime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_version","type":"uint16"}],"name":"setReceiveVersion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_version","type":"uint16"}],"name":"setSendVersion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_remoteChainId","type":"uint16"},{"internalType":"bytes","name":"_path","type":"bytes"}],"name":"setTrustedRemote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_remoteChainId","type":"uint16"},{"internalType":"bytes","name":"_remoteAddress","type":"bytes"}],"name":"setTrustedRemoteAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"trustedRemoteLookup","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]',
    l2telegraph: '[{"inputs":[{"internalType":"address","name":"_endpoint","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"endpoint","outputs":[{"internalType":"contract ILayerZeroEndpoint","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"address","name":"_userApplication","type":"address"},{"internalType":"bytes","name":"_payload","type":"bytes"},{"internalType":"bool","name":"_payInZRO","type":"bool"},{"internalType":"bytes","name":"_adapterParams","type":"bytes"}],"name":"estimateFees","outputs":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"zroFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastMessage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"bytes","name":"_from","type":"bytes"},{"internalType":"uint64","name":"","type":"uint64"},{"internalType":"bytes","name":"_payload","type":"bytes"}],"name":"lzReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"message","type":"string"},{"internalType":"uint16","name":"destChainId","type":"uint16"},{"internalType":"bytes","name":"_destination","type":"bytes"}],"name":"sendMessage","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newCost","type":"uint256"}],"name":"setCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]',
    gazZip: '[{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_endpoint","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyInitialized","type":"error"},{"inputs":[],"name":"NewOwnerIsZeroAddress","type":"error"},{"inputs":[],"name":"NoHandoverRequest","type":"error"},{"inputs":[],"name":"Unauthorized","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pendingOwner","type":"address"}],"name":"OwnershipHandoverCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pendingOwner","type":"address"}],"name":"OwnershipHandoverRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[]","name":"params","type":"uint256[]"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"},{"indexed":false,"internalType":"address","name":"from","type":"address"}],"name":"SentDeposits","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32[]","name":"eids","type":"uint32[]"},{"indexed":false,"internalType":"bytes[]","name":"messages","type":"bytes[]"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"},{"indexed":false,"internalType":"address","name":"from","type":"address"}],"name":"SentMessages","type":"event"},{"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"origin","type":"tuple"}],"name":"allowInitializePath","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cancelOwnershipHandover","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"pendingOwner","type":"address"}],"name":"completeOwnershipHandover","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_dstEid","type":"uint32"},{"internalType":"uint128","name":"_nativeAmount","type":"uint128"},{"internalType":"address","name":"_to","type":"address"}],"name":"createNativeDropOption","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"_dstEid","type":"uint32"}],"name":"createReceiveOption","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"defaultGasLimit","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"endpoint","outputs":[{"internalType":"contract ILayerZeroEndpointV2","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32[]","name":"_dstEids","type":"uint32[]"},{"internalType":"bytes[]","name":"_messages","type":"bytes[]"},{"internalType":"bytes[]","name":"_options","type":"bytes[]"}],"name":"estimateFees","outputs":[{"internalType":"uint256[]","name":"nativeFees","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"","type":"uint32"}],"name":"gasLimitLookup","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"","type":"tuple"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"address","name":"","type":"address"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"lzReceive","outputs":[],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint32","name":"","type":"uint32"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"nextNonce","outputs":[{"internalType":"uint64","name":"nonce","type":"uint64"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"result","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pendingOwner","type":"address"}],"name":"ownershipHandoverExpiresAt","outputs":[{"internalType":"uint256","name":"result","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"","type":"uint32"}],"name":"peers","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"_dstEid","type":"uint32"},{"internalType":"bytes","name":"_message","type":"bytes"},{"internalType":"bytes","name":"_options","type":"bytes"}],"name":"quote","outputs":[{"internalType":"uint256","name":"nativeFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"requestOwnershipHandover","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_depositParams","type":"uint256[]"},{"internalType":"address","name":"_to","type":"address"}],"name":"sendDeposits","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint32[]","name":"_dstEids","type":"uint32[]"},{"internalType":"bytes[]","name":"_messages","type":"bytes[]"}],"name":"sendMessages","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint128","name":"_defaultGasLimit","type":"uint128"}],"name":"setDefaultGasLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_delegate","type":"address"}],"name":"setDelegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32[]","name":"_remoteEids","type":"uint32[]"},{"internalType":"uint128[]","name":"_gasLimits","type":"uint128[]"}],"name":"setGasLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32[]","name":"_remoteEids","type":"uint32[]"},{"internalType":"bytes32[]","name":"_remoteAddresses","type":"bytes32[]"}],"name":"setPeers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lib","type":"address"},{"internalType":"uint64","name":"confirmations","type":"uint64"},{"internalType":"uint32[]","name":"eids","type":"uint32[]"},{"internalType":"address","name":"dvn","type":"address"}],"name":"setUlnConfigs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]'
};
const CONTRACT_ADDRESSES = {
    polygon: {
        merkly: "0x0E1f20075C90Ab31FC2Dd91E536e6990262CF76d",
        l2pass: "0x222228060E7Efbb1D78BB5D454581910e3922222",
        zerius: "0x2ef766b59e4603250265EcC468cF38a6a00b84b3",
        l2telegraph: "0x523d5581A0bb8BB2Bc9f23B5202894E31124eA3e",
        gazZip: "0x26DA582889f59EaaE9dA1f063bE0140CD93E6a4f",
    },
    celo: {
        merkly: "0xC20A842e1Fc2681920C1A190552A2f13C46e7fCF",
        l2pass: "0x222228060e7efbb1d78bb5d454581910e3922222",
        l2telegraph: "0x83017335bae4837016311bdb75df5a320b54d636",
        gazZip: "0x26DA582889f59EaaE9dA1f063bE0140CD93E6a4f",
    },
    gnosis: {
        merkly: "0x556F119C7433b2232294FB3De267747745A1dAb4",
        l2pass: "0x222228060E7Efbb1D78BB5D454581910e3922222",
        l2telegraph: "0xE266EedB13A69AF15c1756a241021905B1827F6A",
        gazZip: "0x26DA582889f59EaaE9dA1f063bE0140CD93E6a4f",
    },
    moonbeam: {
        merkly: "0x671861008497782F7108D908D4dF18eBf9598b82",
        l2pass: "0x222228060E7Efbb1D78BB5D454581910e3922222",
        gazZip: "0x26DA582889f59EaaE9dA1f063bE0140CD93E6a4f",
    },
    moonriver: {
        merkly: "0xd379c3D0930d70022B3C6EBA8217e4B990705540",
        l2pass: "0x222228060E7Efbb1D78BB5D454581910e3922222",
        l2telegraph: "0x5B10aE182C297ec76fE6fe0E3Da7c4797ceDE02D",
        gazZip: "0x26DA582889f59EaaE9dA1f063bE0140CD93E6a4f",
    },
    klaytn: {
        merkly: "0x79DB0f1A83f8e743550EeB5DD5B0B83334F2F083",
        l2pass: "0x222228060E7Efbb1D78BB5D454581910e3922222",
        gazZip: "0x26DA582889f59EaaE9dA1f063bE0140CD93E6a4f",
    },
};
export const ZERIUS_REFUEL_CONTRACTS = {
    145: '0x1fe2c567169d39CCc5299727FfAC96362b2Ab90E',
    116: '0x5B209E7c81DEaad0ffb8b76b696dBb4633A318CD',
    153: '0xB47D82aA70f839dC27a34573f135eD6dE6CED9A5',
    125: '0xFF21d5a3a8e3E8BA2576e967888Deea583ff02f8',
    126: '0xb0bea3bB2d6EDDD2014952ABd744660bAeF9747d',
};
export const CHAINS = {
    polygon: {
        minBalance: 0.2,
        names: ["merkly", "l2pass", "zerius", "l2telegraph", "gazZip"],
        protocols: {
            merkly: {
                contract: await getContract(CONTRACT_ADDRESSES.polygon.merkly, ABI.merkly, await PROVIDERS.polygon),
                dstChains: [125, 126, 167, 177, 115, 150, 145, 196, 230],
            },
            l2pass: {
                contract: await getContract(CONTRACT_ADDRESSES.polygon.l2pass, ABI.l2pass, await PROVIDERS.polygon),
                dstChains: [150, 116, 145, 126, 125, 177],
            },
            zerius: {
                contract: await getContract(CONTRACT_ADDRESSES.polygon.zerius, ABI.zerius, await PROVIDERS.polygon),
                dstChains: [125, 116],
            },
            l2telegraph: {
                contract: await getContract(CONTRACT_ADDRESSES.polygon.l2telegraph, ABI.l2telegraph, await PROVIDERS.polygon),
                dstChains: [125, 126, 145, 167, 177, 230],
            },
            gazZip: {
                contract: await getContract(CONTRACT_ADDRESSES.polygon.gazZip, ABI.gazZip, await PROVIDERS.polygon),
                dstChains: [145, 153, 125, 167, 175, 138, 198, 150, 197, 196],
            }
        },
        spenders: [
            "0x07e56b727e0EAcFa53823977599905024c2de4F0", "0x643770E279d5D0733F21d6DC03A8efbABf3255B4",
            "0x1111111254EEB25477B68fb85Ed929f73A960582", "0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57",
            "0x4E3288c9ca110bCC82bf38F09A7b425c095d92Bf",
        ],
        tokens: [
            "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", "0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3",
            "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7", "0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b"
        ],
    },
    celo: {
        minBalance: 0.25,
        names: ["merkly", "l2pass", "l2telegraph", "gazZip"],
        protocols: {
            merkly: {
                contract: await getContract(CONTRACT_ADDRESSES.celo.merkly, ABI.merkly, await PROVIDERS.celo),
                dstChains: [126, 145],
            },
            l2pass: {
                contract: await getContract(CONTRACT_ADDRESSES.celo.l2pass, ABI.l2pass, await PROVIDERS.celo),
                dstChains: [126, 145],
            },
            l2telegraph: {
                contract: await getContract(CONTRACT_ADDRESSES.celo.l2telegraph, ABI.l2telegraph, await PROVIDERS.celo),
                dstChains: [126, 145],
            },
            gazZip: {
                contract: await getContract(CONTRACT_ADDRESSES.celo.gazZip, ABI.gazZip, await PROVIDERS.celo),
                dstChains: [145, 153, 125, 167, 175, 138, 198, 150, 197, 196],
            }
        },
        spenders: [
            "0x000000000022d473030f116ddee9f6b43ac78ba3", "0xaB235da7f52d35fb4551AfBa11BFB56e18774A65",
            "0xe3d8bd6aed4f159bc8000a9cd47cffdb95f96121", "0x471EcE3750Da237f93B8E339c536989b8978a438",
        ],
        tokens: [
            "0x617f3112bf5397D0467D315cC709EF968D9ba546", "0xef4229c8c3250C675F21BCefa42f58EfbfF6002a",
            "0x37f750B7cC259A2f741AF45294f6a16572CF5cAd", "0xD629eb00dEced2a080B7EC630eF6aC117e614f1b",
            "0x471EcE3750Da237f93B8E339c536989b8978a438", "0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1"
        ],
    },
    moonbeam: {
        minBalance: 0.3,
        names: ["merkly", "l2pass", "gazZip"],
        protocols: {
            merkly: {
                contract: await getContract(CONTRACT_ADDRESSES.moonbeam.merkly, ABI.merkly, await PROVIDERS.moonbeam),
                dstChains: [115, 125, 116],
            },
            l2pass: {
                contract: await getContract(CONTRACT_ADDRESSES.moonbeam.l2pass, ABI.l2pass, await PROVIDERS.moonbeam),
                dstChains: [145, 125, 116],
            },
            gazZip: {
                contract: await getContract(CONTRACT_ADDRESSES.moonbeam.gazZip, ABI.gazZip, await PROVIDERS.moonbeam),
                dstChains: [145, 153, 125, 167, 175, 138, 198, 150, 197, 196],
            },
        },
        spenders: [
            "0x843D0AAD40295f2198ef528ad747CDF6AB9000e4", "0xd95fe880d7717f7f20981FE6e41A2315f3EFeAb5",
            "0x603eF396029b5e89f9420b4192814aEC0664ADAb", "0xd3B02Ff30c218c7f7756BA14bcA075Bf7C2C951e",
        ],
        tokens: [
            "0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73", "0x931715FEE2d06333043d11F658C8CE934aC61D0c",
            "0x4792C1EcB969B036eb51330c63bD27899A13D84e", "0x3405A1bd46B85c5C029483FbECf2F3E611026e45",
            "0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b",
        ],
    },
    moonriver: {
        minBalance: 0.01,
        names: ["merkly", "l2pass", "l2telegraph", "gazZip"],
        protocols: {
            merkly: {
                contract: await getContract(CONTRACT_ADDRESSES.moonriver.merkly, ABI.merkly, await PROVIDERS.moonriver),
                dstChains: [177],
            },
            l2pass: {
                contract: await getContract(CONTRACT_ADDRESSES.moonriver.l2pass, ABI.l2pass, await PROVIDERS.moonriver),
                dstChains: [177],
            },
            l2telegraph: {
                contract: await getContract(CONTRACT_ADDRESSES.moonriver.l2telegraph, ABI.l2telegraph, await PROVIDERS.moonriver),
                dstChains: [177],
            },
            gazZip: {
                contract: await getContract(CONTRACT_ADDRESSES.moonriver.gazZip, ABI.gazZip, await PROVIDERS.moonriver),
                dstChains: [145, 153, 125, 167, 175, 138, 198, 150, 197, 196],
            },
        },
        spenders: [
            "0x7af71799C40F952237eAA4D81A77C1af49125113", "0xD8FC27ec222E8d5172CD63aC453C6Dfb7467a3C7",
            "0xFB45b575b66C99e0C8d2639aCf237807d4ea1508",
        ],
        tokens: [
            "0xB44a9B6905aF7c801311e8F4E76932ee959c663C", "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D",
            "0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844", "0x98878B06940aE243284CA214f92Bb71a2b032B8A",
        ],
    },
    gnosis: {
        minBalance: 0.0012,
        names: ["merkly", "l2pass", "l2telegraph", "gazZip"],
        protocols: {
            merkly: {
                contract: await getContract(CONTRACT_ADDRESSES.gnosis.merkly, ABI.merkly, await PROVIDERS.gnosis),
                dstChains: [125, 126, 150],
            },
            l2pass: {
                contract: await getContract(CONTRACT_ADDRESSES.gnosis.l2pass, ABI.l2pass, await PROVIDERS.gnosis),
                dstChains: [125, 150, 126],
            },
            l2telegraph: {
                contract: await getContract(CONTRACT_ADDRESSES.gnosis.l2telegraph, ABI.l2telegraph, await PROVIDERS.gnosis),
                dstChains: [125, 126, 150],
            },
            gazZip: {
                contract: await getContract(CONTRACT_ADDRESSES.gnosis.gazZip, ABI.gazZip, await PROVIDERS.gnosis),
                dstChains: [145, 153, 125, 167, 175, 138, 198, 150, 197, 196],
            },
        },
        spenders: [
            "0x1111111254EEB25477B68fb85Ed929f73A960582", "0x7A4af156379f512DE147ed3b96393047226d923F",
            "0xBA12222222228d8Ba445958a75a0704d566BF2C8", "0x6093AeBAC87d62b1A5a4cEec91204e35020E38bE",
        ],
        tokens: [
            "0x4ECaBa5870353805a9F068101A40E0f32ed605C6", "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
            "0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2", "0x7122d7661c4564b7C6Cd4878B06766489a6028A2"
        ],
    },
    klaytn: {
        minBalance: 0.2,
        names: ["merkly", "l2pass", "gazZip"],
        protocols: {
            merkly: {
                contract: await getContract(CONTRACT_ADDRESSES.klaytn.merkly, ABI.merkly, await PROVIDERS.klaytn),
                dstChains: [145, 115],
            },
            l2pass: {
                contract: await getContract(CONTRACT_ADDRESSES.klaytn.l2pass, ABI.l2pass, await PROVIDERS.klaytn),
                dstChains: [145],
            },
            gazZip: {
                contract: await getContract(CONTRACT_ADDRESSES.klaytn.gazZip, ABI.gazZip, await PROVIDERS.klaytn),
                dstChains: [145, 153, 125, 167, 175, 138, 198, 150, 197, 196],
            },
        },
        spenders: ["0xe0fbB27D0E7F3a397A67a9d4864D4f4DD7cF8cB9", "0xF7BF3499Df413aC09C4BC8F7521EB4953B5f7bda"],
        tokens: [
            "0x34d21b1e550d73cee41151c77f3c73359527a396", "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167",
            "0x574e9c26bda8b95d7329505b4657103710eb32ea", "0x754288077d0ff82af7a5317c7cb8c444d421d103",
            "0x5c74070fdea071359b86082bd9f9b3deaafbe32b",
        ],
    },
};
export const EXPLORERS = {
    era: 'https://explorer.zksync.io/tx/',
    polygon: 'https://polygonscan.com/tx/',
    celo: 'https://celoscan.io/tx/',
    moonbeam: 'https://moonscan.io/tx/',
    moonriver: 'https://moonriver.moonscan.io/tx/',
    gnosis: 'https://gnosisscan.io/tx/',
    klaytn: 'https://klaytnscope.com/tx/',
};
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
