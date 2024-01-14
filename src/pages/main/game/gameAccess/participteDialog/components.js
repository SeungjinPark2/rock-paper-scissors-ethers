import styled from 'styled-components';
import { ColumnFlexBox, borderGradient } from '../../../../../components';

export const ParticipateDialogBox = styled(ColumnFlexBox)`
    width: 300px;
    height: 250px;
    border-radius: 10px;
    padding: 15px;
    box-sizing: border-box;
    justify-content: space-between;
    ${borderGradient}
`;
