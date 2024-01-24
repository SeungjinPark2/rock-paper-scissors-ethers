import { useMemo, useState } from 'react';
import { useGameValue } from '../../../hooks/useGame';
import { OpponentSpan, Pane, PlayerSidePane, Splitter } from './components';
import OpponentBoard from './opponentBoard';
import { useGameWithMetaMask } from '../../../hooks/useGameWithMetaMask';

function GameBoard() {
    const {
        player1,
        player2,
        userAddr,
        betSize,
        expired,
    } = useGameValue();
    const { GameWithMetaMask } = useGameWithMetaMask();
    const [loading, setLoading] = useState(false);

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

    return (
        <Pane>
            <PlayerSidePane>
                <OpponentSpan>opponent</OpponentSpan>
                <OpponentBoard opponent={opponent} />
            </PlayerSidePane>
            <Splitter />
            <PlayerSidePane onDragOver={(e) => {
                e.preventDefault();
            }}>  
            </PlayerSidePane>
        </Pane>
    );
}

export default GameBoard;