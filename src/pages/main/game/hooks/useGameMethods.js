import useSalt from '../../../../hooks/useSalt';
import { useGameWithMetaMask } from './useGameWithMetaMask';
import { soliditySha3 } from 'web3-utils';
import { useGameUpdate, useGameValue } from './useGame';
import { createContext, useContext, useMemo } from 'react';

const GameMethodContext = createContext();

export function GameMethodProvider({ children }) {
    const { userAddr, betSize } = useGameValue();
    const { setUserStatus } = useGameUpdate();
    const { GameWithMetaMask } = useGameWithMetaMask();
    const { getSalt, clearSalt } = useSalt();

    const methods = useMemo(() => ({
        participate: async (setLoading) => {
            setLoading(true);

            try {
                await GameWithMetaMask.methods.participate().send({
                    from: userAddr,
                });
            } catch (error) {
                console.error(error);
            }

            setLoading(false);
            setUserStatus('participant');
        },
        bet: async () => {
            try {
                await GameWithMetaMask.methods.bet().send({
                    from: userAddr,
                    value: betSize,
                    gas: 60000, // hard-coded...
                });
            } catch (error) {
                console.log(error);
            }
        },
        reveal: async () => {
            const currentHand = parseInt(localStorage.getItem('hand'));
            const salt = '0x' + getSalt();

            try {
                await GameWithMetaMask.methods.reveal(currentHand, salt).send({
                    from: userAddr,
                });
            } catch (error) {
                // TODO: handle error
                console.log(error);
            }
        },
        commit: async (hand) => {
            clearSalt();

            const salt = getSalt();
            let parsedHand;

            if (hand === 'rock') {
                parsedHand = 1n;
            } else if (hand = 'scissors') {
                parsedHand = 2n;
            } else {
                parsedHand = 3n;
            }

            window.localStorage.setItem('hand', parsedHand);

            // The encodePacked does not work well, found kind of bugs. So manually pack them.
            const commitHash = soliditySha3('0x0' + parsedHand + salt);
            
            try {
                await GameWithMetaMask.methods.commit(commitHash).send({
                    from: userAddr,
                });
            } catch (error) {
                // TODO: handle error
                console.log(error);
            }
        }
    }) , [GameWithMetaMask, userAddr, betSize]);

    return (
        <GameMethodContext.Provider value={methods}>
            {children}
        </GameMethodContext.Provider>
    );
}

export function useGameMethods() {
    const context = useContext(GameMethodContext);
    if (context === undefined) {
        throw new Error('useGameMethods must be used within a "GameMethodContext"');
    }

    return context;
}
