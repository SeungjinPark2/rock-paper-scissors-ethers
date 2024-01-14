import styled from 'styled-components';
import { ColumnFlexBox } from '../../../../../../components';
import Controller from './controller';

const GameControllerStyled = styled(ColumnFlexBox)`
    margin-left: 30px;
`;

function GameController() {
    return (
        <GameControllerStyled>
            <Controller>
            </Controller>
            
        </GameControllerStyled>
    );
}

export default GameController;