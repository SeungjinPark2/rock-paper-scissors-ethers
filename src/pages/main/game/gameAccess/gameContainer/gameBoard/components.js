import styled from 'styled-components';
import { ColumnFlexBox, borderGradient } from '../../../../../../components';

export const Pane = styled(ColumnFlexBox)`
    height: 70vh;
    width: 500px;
    ${borderGradient}
`;

export const PlayerSidePane = styled.div`
    flex-grow: 1;
`;


export const Splitter = styled.div`
    flex-grow: 0;
    ${borderGradient}
    border-width: 2.5px;
`;