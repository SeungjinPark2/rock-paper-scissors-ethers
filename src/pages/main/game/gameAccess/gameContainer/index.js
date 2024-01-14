import styled from 'styled-components';
import { RowFlexBox } from '../../../../../components';
import GameBoard from './gameBoard';
import GameController from './gameController';

const GameContainerStyled = styled(RowFlexBox)``;

function GameContainer() {
    return (
        <GameContainerStyled>
            <GameBoard />
            <GameController />
        </GameContainerStyled>
    );
}

export default GameContainer;