import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMetaMask } from '../../../../hooks/useMetaMask';
import { useContract } from '../../../../hooks/useContract';
import { isAddress } from 'web3-validator';
import { useNetworkValueContext } from '../../../../hooks/useEthereum';
import { eth } from 'web3';
import { findEvent } from '../../../../ethereum';

const initialPlayer = {
    player: '',
    commit: '',
    hand: 0,
    betDone: false,
};

const GameUpdateContext = createContext();
const GameValueContext = createContext();

export function GameProvider({ children }) {
    const { wsProvider } = useNetworkValueContext();
    const { address } = useParams();
    const { Game } = useContract();
    const { wallet } = useMetaMask();
    const navigate = useNavigate();

    const [player1, setPlayer1] = useState(initialPlayer);
    const [player2, setPlayer2] = useState(initialPlayer);
    const [betSize, setBetSize] = useState(0);
    const [phase, setPhase] = useState(0);
    const [phaseExpiration, setPhaseExpiration] = useState(0);
    const [userStatus, setUserStatus] = useState/*<'creator' | 'pending' | 'participant' | 'observer'>*/();
    const [expired, setExpired] = useState(true);
    const [winner, setWinner] = useState('');

    const userAddr = useMemo(() => wallet.accounts[0], [wallet]);
    const loaded = useMemo(() => 
        betSize != null
        && phase != null
        && phaseExpiration != null
        && userStatus != null
        && player1.player !== '',
    [betSize, phase, phaseExpiration, userStatus, player1]);

    // TODO: 404 페이지가 더 적절할까?
    if (isAddress(address) === false) {
        navigate('/', { replace: true });
    } else {
        Game.options.address = address;
    }

    useEffect(() => {
        if ((player1 !== '' || player2 !== '') && userAddr != null) {
            if (player1.player.toLocaleLowerCase() === userAddr) {
                setUserStatus('creator');
            } else if (player2.player.toLocaleLowerCase() === '0x0000000000000000000000000000000000000000') {
                setUserStatus('pending');
            } else if (player2.player.toLocaleLowerCase() === userAddr) {
                setUserStatus('participant');
            } else {
                setUserStatus('observer');
            }
        }
    }, [player1, player2, userAddr]);

    useEffect(() => {
        let logSubscription = null;

        if (wsProvider != null) {
            if (Game.currentProvider == null) {
                Game.setMaxListenerWarningThreshold(20);
                Game.setProvider(wsProvider);
            }

            Game.methods.player1().call()
                .then(setPlayer1);
            Game.methods.player2().call()
                .then(setPlayer2);
            Game.methods.betSize().call()
                .then(setBetSize);
            Game.methods.phase().call()
                .then(setPhase);
            Game.methods.phaseExpiration().call()
                .then(setPhaseExpiration);

            logSubscription = Game.events.allEvents();
            logSubscription.on('data', (event) => {
                if (event.event === 'UpdatePlayers') {
                    const eventAbi = findEvent('UpdatePlayers');
                    const { player1, player2 } = eth.abi.decodeLog(eventAbi.inputs, event.data, []);
                    setPlayer1(player1);
                    setPlayer2(player2);
                } else if (event.event === 'PhaseChanged') {
                    const eventAbi = findEvent('PhaseChanged');
                    const { phase } = eth.abi.decodeLog(eventAbi.inputs, event.data, []);
                    setPhase(phase);
                    // phaseExpiration has no event so manually call to fetch
                    Game.methods.phaseExpiration().call()
                        .then(setPhaseExpiration);
                } else if (event.event === 'Winner') {
                    const eventAbi = findEvent('Winner');
                    const { winner } = eth.abi.decodeLog(eventAbi.inputs, event.data, event.topics);
                    setWinner(winner);
                } else {
                    console.log(event);
                }
            });
        }

        return () => {
            Game.removeAllListeners();
            logSubscription?.unsubscribe();
        };
    }, [wsProvider]);

    return (
        <GameUpdateContext.Provider 
            value={{
                setUserStatus,
                setExpired,
            }}
        >
            <GameValueContext.Provider
                value={{
                    player1,
                    player2,
                    betSize,
                    userAddr,
                    phase,
                    phaseExpiration,
                    userStatus,
                    expired,
                    loaded,
                    winner,
                }}
            >
                { children }
            </GameValueContext.Provider>
        </GameUpdateContext.Provider>
    );
}

export function useGameUpdate() {
    const context = useContext(GameUpdateContext);
    if (context === undefined) {
        throw new Error('useGameUpdate must be used within a "GameProvider"');
    }

    return context;
}

export function useGameValue() {
    const context = useContext(GameValueContext);
    if (context === undefined) {
        throw new Error('useGameValue must be used within a "GameProvider"');
    }

    return context;
}