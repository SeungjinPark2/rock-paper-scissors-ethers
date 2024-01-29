import { Pane, Splitter } from './components';
import OpponentBoard from './opponentBoard';
import PlayerBoard from './playerBoard';
import useSelfOpponent from '../hooks/useSelfOpponent';

function GameBoard({ setDialogOpen }) {
    const { self, opponent } = useSelfOpponent();

    return (
        <Pane>
            <OpponentBoard opponent={opponent} />
            <Splitter />
            <PlayerBoard self={self} setDialogOpen={setDialogOpen}/>
        </Pane>
    );
}

export default GameBoard;