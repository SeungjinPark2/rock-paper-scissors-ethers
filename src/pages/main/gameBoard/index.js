import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMetaMask } from '../../../hooks/useMetaMask';
import { useContract } from '../../../hooks/useContract';
import { isAddress } from 'web3-validator';
import { useNetworkValueContext } from '../../../hooks/useEthereum';
import { Loader, MaskBackground } from '../../../components';
import ParticipateDialog from './participteDialog';

const initialPlayer = {
    player: '',
    commit: '',
    phase: 0,
    betDone: false,
};

function GameBoard() {
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
    const [userStatus, setUserStatus] = useState/*<'creator' | 'pending' | 'participant' | 'observer'>*/(false);

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
                console.log(event);
            });
        }

        return () => {
            Game.removeAllListeners();
            logSubscription?.unsubscribe();
        };
    }, [wsProvider]);

    if (loaded === false) {
        return (
            <MaskBackground>
                <Loader />
            </MaskBackground>
        );
    } else if (userStatus === 'pending') {
        return (
            <ParticipateDialog betSize={betSize} creator={player1.player} Game={Game} />
        );
    } else {
        return (
            <>
                this is main
            </>
        );
    }
}

export default GameBoard;