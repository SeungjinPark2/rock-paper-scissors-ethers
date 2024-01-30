import styled from 'styled-components';
import { MaskBackground, RowFlexBox } from '../../../../../components';
import GameBoard from './gameBoard';
import GameController from './gameController';
import WinnerDialog from './winnerDialog';
import { useMemo, useState } from 'react';
import { useGameValue } from '../../hooks/useGame';

const GameContainerStyled = styled(RowFlexBox)``;

function GameContainer() {
    const [ dialogOpen, setDialogOpen ] = useState(false);
    const { winner, phase } = useGameValue();

    const showWin = useMemo(() => 
        winner !== ''
        && (phase === 1n || phase === 2n)
        && dialogOpen
    , [winner, phase, dialogOpen]);

    return (
        <GameContainerStyled>
            {
                showWin && <MaskBackground>
                    <WinnerDialog setDialogOpen={setDialogOpen} />
                </MaskBackground>
            }
            <GameBoard setDialogOpen={setDialogOpen} />
            <GameController />
        </GameContainerStyled>
    );
}

export default GameContainer;