const networks = [
    {
        chainId: '0x7a69',
        chainName: 'Anvil',
        rpcUrls: ['ws://localhost:8545'],
    },
    {
        chainId: '0x13881',
        chainName: 'Mumbai',
        rpcUrls: ['ws://rpc-mumbai.matic.today'],
    },
];

export function getSupportedNetworks() {
    return process.env.NODE_ENV === 'production' ?
        networks.filter(network => network.chainId !== '0x7a69') :
        networks;
}

