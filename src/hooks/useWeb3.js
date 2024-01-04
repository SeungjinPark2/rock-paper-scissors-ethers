import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { GameFactoryAbi, getSupportedNetworks } from '../ethereum';
import Web3, { WebSocketProvider } from 'web3';

const Web3Context = createContext({});

export function Web3ContextProvider({ children }) {
    const supportedNetworks = getSupportedNetworks();
    const [currentNetwork, setCurrentNetwork] = useState(supportedNetworks[0]);
    const [web3Obj, setWeb3Obj] = useState();
    const [contractObj, setContractObj] = useState();
    const [error, setError] = useState();

    const updateWeb3 = useCallback((network) => setCurrentNetwork(network), []);

    useEffect(() => {
        const provider = new WebSocketProvider(currentNetwork.websocketUrl);
        const _web3 = new Web3(provider);

        // _web3.provider.on('connect', (e) => {
        //     console.log(e);
        // });
        // TODO: handle properly
        _web3.provider.on('error', (e) => {
            setError(e.message);
        });

        setWeb3Obj(_web3);
        setContractObj(new _web3.eth.Contract(GameFactoryAbi, currentNetwork.contractAddress));
        
        return () => {
            if (web3Obj != null) {
                web3Obj.removeAllListeners();
            }
        };
    }, [currentNetwork]);

    return (
        <Web3Context.Provider
            value={{
                web3Obj,
                contractObj,
                error,
                updateWeb3,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
}

export const useWeb3 = () => {
    const context = useContext(Web3Context);
    if (context === undefined) {
        throw new Error('useWeb3 must be used within a "Web3ContextProvider"');
    }

    return context;
};
