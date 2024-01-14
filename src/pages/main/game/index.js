import GameAccess from './gameAccess';
import { GameProvider } from './hooks/useGame';
import { GameWithMetaMaskProvider } from './hooks/useGameWithMetaMask';

function Game() {
    return (
        <GameProvider>
            <GameWithMetaMaskProvider>
                <GameAccess />

            </GameWithMetaMaskProvider>
        </GameProvider>
    );
}

export default Game;
