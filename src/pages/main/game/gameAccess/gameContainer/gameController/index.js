import styled from 'styled-components';
import { ColumnFlexBox } from '../../../../../../components';
import Controller from './controller';
import Deck from './deck';

const GameControllerStyled = styled(ColumnFlexBox)`
    margin-left: 30px;
    justify-content: space-between;
`;

function GameController() {
    return (
        <GameControllerStyled>
            <Controller />
            <Deck />
        </GameControllerStyled>
    );
}

export default GameController;