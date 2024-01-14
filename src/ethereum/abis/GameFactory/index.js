export default [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "game",
                "type": "address"
            }
        ],
        "name": "NewGame",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "_expiration",
                "type": "uint16"
            },
            {
                "internalType": "uint256",
                "name": "_betSize",
                "type": "uint256"
            }
        ],
        "name": "createGame",
        "outputs": [
            {
                "internalType": "address",
                "name": "_gameAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_gameCreator",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_expiration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_betSize",
                "type": "uint256"
            }
        ],
        "name": "getBytecode",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "_bytecode",
                "type": "bytes"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_gameCreator",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_expiration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_betSize",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_gameNumber",
                "type": "uint256"
            }
        ],
        "name": "getGameAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "game",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];