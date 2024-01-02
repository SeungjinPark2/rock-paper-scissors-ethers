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
        websocketUrl: 'ws://rpc-mumbai.matic.today',
        rpcUrl: 'https://rpc.ankr.com/polygon_mumbai',
    },
];

export function getSupportedNetworks() {
    return process.env.NODE_ENV === 'production' ?
        networks.filter(network => network.chainId !== '0x7a69') :
        networks;
}

