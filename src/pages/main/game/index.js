import GameAccess from './gameAccess';
import { GameProvider } from './useGame';

function Game() {
    return (
        <GameProvider>
            <GameAccess />
        </GameProvider>
    );
}

export default Game;
