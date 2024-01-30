import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { getSupportedNetworks } from '../ethereum';
import { WebSocketProvider } from 'web3';

const NetworkValueContext = createContext();
const NetworkUpdateContext = createContext();

export function NetworkProvider({ children }) {
    const supportedNetworks = useMemo(() => getSupportedNetworks(), []);
    const [network, setNetwork] = useState(supportedNetworks[0]);
    const [networkErrorMsg, setNetworkErrorMsg] = useState();
    const [wsProvider, setWsProvider] = useState();

    const updateNetwork = useCallback((network_, setLoading) => {
        connectNetwork(network_, setLoading);
        setNetwork(network_);
    }, []);

    const connectNetwork = useCallback((network_, setLoading) => {
        wsProvider?.removeAllListeners();

        const provider = new WebSocketProvider(network_.websocketUrl);

        provider.on('connect', () => {
            setLoading(false);
        });

        provider.on('error', (e) => {
            // TODO: if emits error event when listening contract logs, detach each cases.
            if (e.message) {
                setNetworkErrorMsg(e.message);
            } else {
                setNetworkErrorMsg(`Failed to connect to ${e.currentTarget.url}`);
            }
            setLoading(false);
        });

        setWsProvider(provider);
    }, []);

    return (
        <NetworkUpdateContext.Provider value={{ updateNetwork }}>
            <NetworkValueContext.Provider 
                value={{ network, networkErrorMsg, wsProvider: wsProvider, supportedNetworks }}
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
