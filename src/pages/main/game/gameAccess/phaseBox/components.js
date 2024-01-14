import styled from 'styled-components';
import { ColumnFlexBox, borderGradient } from '../../../../../components';

export const PhaseContainer = styled(ColumnFlexBox)`
    position: fixed;
    top: 0;
    right: 0;
    margin: 20px;
    
    ${borderGradient}
    & > div {
        padding: 10px 20px;
        text-align: center;
    }
`;
