import styled from 'styled-components';
import { RowFlexBox } from '../../../../../../../components';
import { Card } from '../../component';

export const CardContainer = styled(RowFlexBox)`
    justify-content: center;
    align-items: center;
    height: 150px;

    & > ${/* sc-sel */Card}:first-child {
        transform: rotate(-33deg);
        margin-bottom: -50px;
        z-index: 10;
    }
    & > ${/* sc-sel */Card}:nth-child(2) {
        margin: 0 -15px 0 -15px;
        z-index: 11;
    }
    & > ${/* sc-sel */Card}:last-child {
        transform: rotate(33deg);
        margin-bottom: -50px;
        z-index: 12;
    }
    & > ${/* sc-sel */Card}:hover {
        margin-top: -10px;
    }
`;
