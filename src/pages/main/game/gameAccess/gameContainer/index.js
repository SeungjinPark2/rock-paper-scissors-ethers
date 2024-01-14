import styled from 'styled-components';
import { RowFlexBox } from '../../../../../components';
import GameBoard from './gameBoard';
import GameController from './gameController';

const GameContainerStyled = styled(RowFlexBox)`
    justify-content: space-between;
`;

function GameContainer({ player1, player2, userAddr }) {
    return (
        <GameContainerStyled>
            <GameBoard player1={player1} player2={player2} userAddr={userAddr} />
            <GameController />
        </GameContainerStyled>
    );
}

export default GameContainer;