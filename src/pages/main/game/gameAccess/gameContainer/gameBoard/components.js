import styled from 'styled-components';
import { ColumnFlexBox, commonBorder } from '../../../../../../components';

export const Pane = styled.div`
    height: 500px;
    width: 500px;
    box-sizing: border-box;
    ${commonBorder}
`;

export const PlayerSidePane = styled(ColumnFlexBox)`
    flex-grow: 1;
    position: relative;
    justify-content: center;
    align-items: center;
    height: 249px;
`;

export const Splitter = styled.div`
    flex-grow: 0;
    ${commonBorder}
    border-style: dotted;
`;

export const OpponentSpan = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
`;