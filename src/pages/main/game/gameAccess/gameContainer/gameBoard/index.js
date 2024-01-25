import { useCallback, useMemo, useRef, useState } from 'react';
import { useGameValue } from '../../../hooks/useGame';
import { OpponentSpan, Pane, PlayerSidePane, Splitter } from './components';
import OpponentBoard from './opponentBoard';
import { useGameWithMetaMask } from '../../../hooks/useGameWithMetaMask';
import useSalt from '../../../../../../hooks/useSalt';
import { soliditySha3 } from 'web3-utils';
import { Buffer } from 'buffer';
import { eth } from 'web3';
import { Card, CardImg } from '../component';

function GameBoard() {
    const {
        player1,
        player2,
        userAddr,
        betSize,
        expired,
        phase,
    } = useGameValue();
    const { GameWithMetaMask } = useGameWithMetaMask();
    const { clearSalt, getSalt } = useSalt();
    const [ loading, setLoading ] = useState(false);

    const {self, opponent} = useMemo(() => {
        const result = {
            self: null,
            opponent: null,
        };

        if ((player1.player).toLowerCase() === userAddr) {
            result.self = player1;
            result.opponent = player2;
        } else {
            result.self = player2;
            result.opponent = player1;
        }

        return result;
    }, [player1, player2, userAddr]);

    const cardSettlement = useMemo(() => {
        let value = <></>;
        // if user committed at commit phase or did not revealed at reveal phase.
        const commitCondition = phase === 2n && self.commit !== eth.abi.encodeParameter('uint32', 0);
        const revealCondition = phase === 3n && self.hand === 0n;

        if (commitCondition || revealCondition) {
            value = (
                <Card $revealable={revealCondition}>
                    <CardImg $imgName={'card.png'} $position={'relative'} />
                </Card>
            );
        }

        return value;
    }, [phase, self]);

    if (expired === false && self != null && self.betDone === false && loading === false) {
        setLoading(true);
        GameWithMetaMask.methods.bet().send({
            value: betSize,
            from: userAddr,
            gas: 60000, // hard coded...
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });
    }

    const commit = useCallback(async (hand) => {
        setLoading(true);
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

        const commitHash = soliditySha3(
            {
                type: 'uint8',
                value: parsedHand,
            },
            {
                type: 'bytes32',
                value: Buffer.from(salt, 'hex'),
            }
        );
        
        try {
            await GameWithMetaMask.methods.commit(commitHash).send({
                from: userAddr,
            });
        } catch (error) {
            // TODO: handle error
            console.log(error);
        }

        setLoading(false);
    }, []);

    const handleDrop = useCallback(async (e) => {
        if (self.commit === eth.abi.encodeParameter('uint32', 0) && phase === 2n) {
            const handData = e.dataTransfer.getData('text/plain');
            await commit(handData);
        }
    }, [phase, self]);

    return (
        <Pane>
            <PlayerSidePane>
                <OpponentSpan>opponent</OpponentSpan>
                <OpponentBoard opponent={opponent} />
            </PlayerSidePane>
            <Splitter />
            <PlayerSidePane 
                onDragOver={(e) => {
                    e.preventDefault();
                }}
                onDrop={handleDrop}
            >
                {cardSettlement}
            </PlayerSidePane>
        </Pane>
    );
}

export default GameBoard;