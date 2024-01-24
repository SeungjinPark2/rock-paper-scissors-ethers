import styled from 'styled-components';
import { ColumnFlexBox, commonBorder } from '../../../../../../components';

export const Pane = styled(ColumnFlexBox)`
    height: 70vh;
    width: 500px;
    ${commonBorder}
`;

export const PlayerSidePane = styled.div`
    flex-grow: 1;
`;


export const Splitter = styled.div`
    flex-grow: 0;
    ${commonBorder}
    border-width: 2.5px;
`;