import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getSupportedNetworks } from '../ethereum';
import { WebSocketProvider } from 'web3';

const NetworkValueContext = createContext();
const NetworkUpdateContext = createContext();

export function NetworkProvider({ children }) {
    const supportedNetworks = useMemo(() => getSupportedNetworks(), []);
    const [network, setNetwork] = useState(supportedNetworks[0]);
    const [connecting, setConnecting] = useState(false);
    const [networkErrorMsg, setNetworkErrorMsg] = useState();
    const [wsProvider, setWsProvider] = useState();

    // TODO: setConnecting to true will not be back to false if network state same as before.
    const updateNetwork = useCallback((network) => {
        setConnecting(true);
        setNetwork(network);
    }, []);

    useEffect(() => {
        const provider = new WebSocketProvider(network.websocketUrl);

        provider.on('connect', () => {
            setConnecting(false);
        });

        provider.on('error', (e) => {
            // TODO: if emits error event when listening contract logs, detach each cases.
            if (e.message) {
                setNetworkErrorMsg(e.message);
            } else {
                setNetworkErrorMsg(`Failed to connect to ${e.currentTarget.url}`);
            }
            setConnecting(false);
        });

        setWsProvider(provider);
        
        return () => {
            provider.removeAllListeners();
        };
    }, [network]);

    return (
        <NetworkUpdateContext.Provider value={{ updateNetwork }}>
            <NetworkValueContext.Provider 
                value={{ network, connecting, networkErrorMsg, wsProvider: wsProvider, supportedNetworks }}
            >
                {children}
            </NetworkValueContext.Provider>
        </NetworkUpdateContext.Provider>
    );
}

export const useNetworkValueContext = () => {
    const context = useContext(NetworkValueContext);
    if (context === undefined) {
        throw new Error('useWeb3 must be used within a "NetworkValueContext"');
    }

    return context;
};

export const useNetworkUpdateContext = () => {
    const context = useContext(NetworkUpdateContext);
    if (context === undefined) {
        throw new Error('useWeb3 must be used within a "WsProvider"');
    }

    return context;
};
