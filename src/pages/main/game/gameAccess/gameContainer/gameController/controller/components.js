import styled from 'styled-components';
import { ColumnFlexBox, borderGradient } from '../../../../../../../components';

export const ControllerContainer = styled(ColumnFlexBox)`
    box-sizing: border-box;
    height: 300px;
    width: 300px;
    background-color: #000000;
    justify-content: space-between;
    ${borderGradient}
`;

export const TimerContainer = styled.div`
    font-size: 1.8em;
    text-align: center;
`;