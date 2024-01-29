import { useMemo } from 'react';
import { Loader, MaskBackground } from '../../../../components';
import { useGameValue } from '../hooks/useGame';
import GameContainer from './gameContainer';
import ParticipateDialog from './participteDialog';
import { GameMethodProvider } from '../hooks/useGameMethods';

function GameAccess() {
    const {
        loaded,
        userStatus,
    } = useGameValue();

    // TODO: useStatus === 'observer', go back to main.
    const rendering = useMemo(() => {
        if (loaded === false) {
            return (
                <MaskBackground>
                    <Loader />
                </MaskBackground>
            );
        } else if (userStatus === 'pending') {
            return (
                <ParticipateDialog />
            );
        } else {
            return (
                <GameContainer />
            );
        }
    }, [loaded, userStatus]);

    return (
        <GameMethodProvider>
            {rendering}
        </GameMethodProvider>
    );
}

export default GameAccess;