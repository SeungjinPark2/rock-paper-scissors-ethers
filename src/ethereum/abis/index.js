const GameFactoryAbi = [
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
const GameAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_creator",
                "type": "address"
            },
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
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "AddressInsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "FailedInnerCall",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ReentrancyGuardReentrantCall",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "enum PhaseManage.Phase",
                "name": "phase",
                "type": "uint8"
            }
        ],
        "name": "PhaseChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "bool",
                "name": "term",
                "type": "bool"
            }
        ],
        "name": "Terminate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "player",
                "type": "address"
            }
        ],
        "name": "UpdatePlayer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "winner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "prize",
                "type": "uint256"
            }
        ],
        "name": "Winner",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "bet",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "betSize",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claimOpponentVanished",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_commit",
                "type": "bytes32"
            }
        ],
        "name": "commit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "participate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "phase",
        "outputs": [
            {
                "internalType": "enum PhaseManage.Phase",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "phaseExpiration",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "player1",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "player",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "betDone",
                "type": "bool"
            },
            {
                "internalType": "bytes32",
                "name": "commit",
                "type": "bytes32"
            },
            {
                "internalType": "enum RockScissorsPaperLib.Hand",
                "name": "hand",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "player2",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "player",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "betDone",
                "type": "bool"
            },
            {
                "internalType": "bytes32",
                "name": "commit",
                "type": "bytes32"
            },
            {
                "internalType": "enum RockScissorsPaperLib.Hand",
                "name": "hand",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum RockScissorsPaperLib.Hand",
                "name": "_hand",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "_salt",
                "type": "bytes32"
            }
        ],
        "name": "reveal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "terminate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

export {
    GameAbi,
    GameFactoryAbi,
};