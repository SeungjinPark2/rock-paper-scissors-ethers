import detectEthereumProvider from '@metamask/detect-provider';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';

const disconnectedState = { accounts: [], balance: '', chainId: '' };

const MetaMaskContext = createContext({});

export function MetamaskContextProvider({ children }) {
    const [hasProvider, setHasProvider] = useState(null);
    const [metamaskErrorMsg, setMetaMaskErrorMsg] = useState('');

    const clearError = () => setMetaMaskErrorMsg('');

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
            const provider = await detectEthereumProvider({ silent: true, mustBeMetaMask: true });
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

    const connectMetaMask = useCallback(async (setLoading) => {
        setLoading(true);
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            clearError();
            updateWallet(accounts);
        } catch(err) {
            setMetaMaskErrorMsg(err.message);
        }
        setLoading(false);
    }, []);

    const _addNetwork = useCallback(async (network_) => {
        await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: network_.chainId,
                    chainName: network_.chainName,
                    rpcUrls: [network_.rpcUrl],
                    nativeCurrency: {
                        symbol: network_.currencyInfo.symbol,
                        name: network_.currencyInfo.name,
                        decimals: network_.currencyInfo.decimals,
                    },
                },
            ],
        });
    }, []);

    const _switchNetwork = useCallback(async (network_) => {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: network_.chainId }],
        });
    }, []);

    const switchOrAddNetwork = useCallback(async (network_, setLoading) =>  {
        try {
            await _switchNetwork(network_);
            setLoading(false);
        } catch (error) {
            if (error.code === 4902) {
                await _addNetwork(network_);
                setLoading(false);
            }
        }
    }, []);

    return (
        <MetaMaskContext.Provider
            value={{
                wallet,
                hasProvider,
                error: !!metamaskErrorMsg,
                metamaskErrorMsg,
                switchOrAddNetwork,
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
