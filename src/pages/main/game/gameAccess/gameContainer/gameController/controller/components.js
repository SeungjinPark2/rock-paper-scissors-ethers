import styled from 'styled-components';
import { ColumnFlexBox, borderGradient } from '../../../../../../../components';

export const ControllerContainer = styled(ColumnFlexBox)`
    box-sizing: border-box;
    height: 300px;
    width: 300px;
    /* transform: translateY(50%); */
    background-color: #000000;
    ${borderGradient}
`;
