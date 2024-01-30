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
        explorer: '',
        contractAddress: {
            GameFactory: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        },
    },
    {
        chainId: '0x13881',
        chainName: 'Matic Mumbai',
        renderName: 'Matic mumbai',
        currencyInfo: {
            symbol: 'MATIC',
            decimals: 18,
            name: 'matic',
        },
        websocketUrl: 'wss://polygon-mumbai-bor.publicnode.com',
        rpcUrl: 'https://rpc-mumbai.matic.today',
        explorer: 'https://mumbai.polygonscan.com',
        contractAddress: {
            GameFactory: '0xeecae2a9eeb2de031dd7e66ead3618f7083ad830',
        },
    },
    // {
    //     chainId: '0x66eed',
    //     chainName: 'Arbitrum Goerli',
    //     renderName: 'Arbitrum goerli',
    //     currencyInfo: {
    //         symbol: 'AGOR',
    //         decimals: 18,
    //         name: 'agor',
    //     },
    //     websocketUrl: 'wss://arbitrum-goerli.publicnode.com',
    //     rpcUrl: 'https://arbitrum-goerli.publicnode.com',
    //     explorer: '',
    //     contractAddress: {
    //         GameFactory: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    //     },
    // },
];

export function getSupportedNetworks() {
    return process.env.NODE_ENV === 'production' ?
        networks.filter(network => network.chainId !== '0x7a69') :
        networks;
}

