const networks = [
    {
        chainId: '0x7a69',
        chainName: 'Anvil',
        renderName: 'anvil',
        currencyInfo: {
            symbol: 'ETH',
            decimals: 18,
            name: 'eth',
        },
        websocketUrl: 'ws://localhost:8545',
        rpcUrl: 'http://localhost:8545',
        contractAddress: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    },
    {
        chainId: '0x13881',
        chainName: 'Mumbai TestNet',
        renderName: 'mumbai',
        currencyInfo: {
            symbol: 'MATIC',
            decimals: 18,
            name: 'matic',
        },
        websocketUrl: 'wss://rpc-mumbai.matic.today',
        rpcUrl: 'wss://polygon-mumbai-bor.publicnode.com',
        contractAddress: '',
    },
];

export function getSupportedNetworks() {
    return process.env.NODE_ENV === 'production' ?
        networks.filter(network => network.chainId !== '0x7a69') :
        networks;
}

