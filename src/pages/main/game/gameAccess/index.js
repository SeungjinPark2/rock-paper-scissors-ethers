import { Loader, MaskBackground } from '../../../../components';
import { useGameUpdate, useGameValue } from '../useGame';
import GameContainer from './gameContainer';
import ParticipateDialog from './participteDialog';

function GameAccess() {
    const {
        loaded,
        userStatus,
        userAddr,
        player1,
        player2,
        betSize
    } = useGameValue();

    const {
        setUserStatus
    } = useGameUpdate();
    
    if (loaded === false) {
        return (
            <MaskBackground>
                <Loader />
            </MaskBackground>
        );
    } else if (userStatus === 'pending') {
        return (
            <ParticipateDialog
                betSize={betSize}
                creator={player1.player}
                setUserStatus={setUserStatus}
            />
        );
    } else {
        return (
            <GameContainer
                player1={player1}
                player2={player2}
                userAddr={userAddr}
            />
        );
    }
}

export default GameAccess;