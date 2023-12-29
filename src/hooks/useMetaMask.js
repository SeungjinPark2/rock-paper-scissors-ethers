import detectEthereumProvider from '@metamask/detect-provider';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';

const disconnectedState = { accounts: [], balance: '', chainId: '' };

const MetaMaskContext = createContext({});

export function MetamaskContextProvider({ children }) {
    const [hasProvider, setHasProvider] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const clearError = () => setErrorMessage('');

    const [wallet, setWallet] = useState(disconnectedState);

    const _updateWallet = useCallback(async (providedAccounts) => {
        const accounts = providedAccounts || await window.ethereum.request(
            { method: 'eth_accounts' },
        );

        if (accounts.length === 0) {
            // If there are no accounts, then the user is disconnected
            setWallet(disconnectedState);
            return;
        }

        const balance = Web3.utils.fromWei(await window.ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest'],
        }), 'ether');

        const chainId = await window.ethereum.request({
            method: 'eth_chainId',
        });

        setWallet({ accounts, balance, chainId });
    }, []);

    const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet]);
    const updateWallet = useCallback((accounts) => _updateWallet(accounts), [_updateWallet]);

    useEffect(() => {
        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true });
            setHasProvider(Boolean(provider));

            if (provider) {
                updateWalletAndAccounts();
                window.ethereum.on('accountsChanged', updateWallet);
                window.ethereum.on('chainChanged', updateWalletAndAccounts);
            }
        };

        getProvider();

        return () => {
            window.ethereum?.removeListener('accountsChanged', updateWallet);
            window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts);
        };
    }, []);

    const connectMetaMask = async () => {
        setIsConnecting(true);

        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            clearError();
            updateWallet(accounts);
        } catch(err) {
            setErrorMessage(err.message);
        }
        setIsConnecting(false);
    };

    return (
        <MetaMaskContext.Provider
            value={{
                wallet,
                hasProvider,
                error: !!errorMessage,
                errorMessage,
                isConnecting,
                connectMetaMask,
                clearError,
            }}
        >
            {children}
        </MetaMaskContext.Provider>
    );
}

export const useMetaMask = () => {
    const context = useContext(MetaMaskContext);
    if (context === undefined) {
        throw new Error('useMetaMask must be used within a "MetaMaskContextProvider"');
    }

    return context;
};
