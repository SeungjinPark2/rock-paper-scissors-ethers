import { createContext, useContext, useEffect } from 'react';
import { isAddress } from 'web3-validator';
import { useNavigate, useParams } from 'react-router-dom';
import { useMetaMask } from '../../../../hooks/useMetaMask';
import { useContract } from '../../../../hooks/useContract';

const GameWithMetaMaskContext = createContext();

export function GameWithMetaMaskProvider({ children }) {
    const { address } = useParams();
    const { wallet, hasProvider } = useMetaMask();
    const { Game } = useContract();
    const navigate = useNavigate();
 
    if (isAddress(address) === false) {
        navigate('/', { replace: true });
    } else {
        Game.options.address = address;
    }

    useEffect(() => {
        if (wallet.accounts.length > 0 && hasProvider) {
            if (Game.provider == null) {
                Game.setProvider(window.ethereum);
            }
        }

        return () => {
            Game.removeAllListeners();
        };
    }, [hasProvider, wallet]);

    return (
        <GameWithMetaMaskContext.Provider
            value={{ GameWithMetaMask: Game }}
        >
            {children}
        </GameWithMetaMaskContext.Provider>
    );
}

export function useGameWithMetaMask() {
    const context = useContext(GameWithMetaMaskContext);

    if (context === undefined) {
        throw new Error('useGameWithMetaMask must be used within a "GameWithMetaMaskProvider"');
    }

    return context;
}