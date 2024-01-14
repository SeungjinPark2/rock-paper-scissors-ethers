import { Loader, MaskBackground } from '../../../../components';
import { useGameValue } from '../hooks/useGame';
import GameContainer from './gameContainer';
import ParticipateDialog from './participteDialog';

function GameAccess() {
    const {
        loaded,
        userStatus,
    } = useGameValue();
    
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
}

export default GameAccess;