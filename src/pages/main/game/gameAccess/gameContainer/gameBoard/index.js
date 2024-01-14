import { useMemo } from 'react';
import { useGameValue } from '../../../hooks/useGame';
import { Pane, PlayerSidePane, Splitter } from './components';

function GameBoard() {
    const {
        player1,
        player2,
        userAddr,
    } = useGameValue();

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

    return (
        <Pane>
            <PlayerSidePane>
                {
                    opponent.player
                }
            </PlayerSidePane>
            <Splitter />
            <PlayerSidePane>
                {
                    self.player
                }
            </PlayerSidePane>
        </Pane>
    );
}

export default GameBoard;