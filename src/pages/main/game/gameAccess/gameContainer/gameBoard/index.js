import { useGameValue } from '../../../hooks/useGame';
import { Pane, PlayerSidePane, Splitter } from './components';

function GameBoard() {
    const {
        player1,
        player2,
    } = useGameValue();

    return (
        <Pane>
            <PlayerSidePane>
                {
                    player1.player
                }
            </PlayerSidePane>
            <Splitter />
            <PlayerSidePane>
                {
                    player2.player
                }
            </PlayerSidePane>
        </Pane>
    );
}

export default GameBoard;