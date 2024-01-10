import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMetaMask } from '../../../hooks/useMetaMask';
import { useContract } from '../../../hooks/useContract';
import { isAddress } from 'web3-validator';
import { useNetworkValueContext } from '../../../hooks/useEthereum';

function GameBoard() {
    const { wsProvider } = useNetworkValueContext();
    const { address } = useParams();
    const { Game } = useContract();
    const { wallet } = useMetaMask();
    const navigate = useNavigate();

    const userAddr = useMemo(() => wallet.accounts[0], [wallet]);

    const [player1, setPlayer1] = useState();
    const [player2, setPlayer2] = useState();
    const self = useRef();
    const opponent = useRef();

    // TODO: 404 페이지가 더 적절할까?
    if (isAddress(address) === false) {
        navigate('/', { replace: true });
    } else {
        Game.options.address = address;
    }

    // guard logic: 게임의참여자가 아니라면 팅궈낸다.
    // TODO: 402 페이지가 더 적절할까?
    useEffect(() => {
        if (player1 != null && player2 != null && userAddr != null) {
            if (player1.player.toLowerCase() === userAddr) {
                self.current = player1;
                opponent.current = player2;
            } else if (player2.player.toLowerCase() === userAddr) {
                self.current = player2;
                opponent.current = player1;
            } else {
                navigate('/', { replace: true });
            }
        }
    }, [player1, player2, userAddr]);

    useEffect(() => {
        if (wsProvider != null && wallet.accounts.length > 0) {
            Game.setProvider(wsProvider);
    
            // 처음 실행 시 player 들을 초기화 해야한다. 나머지는 event 로 처리하도록 한다.
            if (player1 == null || player2 == null) {
                Game.methods.player1().call()
                    .then(data => { setPlayer1(data); });
                Game.methods.player2().call()
                    .then(data => { setPlayer2(data); });
            }

            /**
             * 여기서 game contract 와 관련된 events 들을 수신하고 local state 로 쓰기
             * players, phase, expiration, ...
             */
        }

        return () => {

        };
    }, [wallet, wsProvider]);

    return (
        <>
            <div>
                {
                    self.current.player
                }
            </div>
            <div>
                {
                    opponent.current.player
                }
            </div>
        </>
    );
}

export default GameBoard;