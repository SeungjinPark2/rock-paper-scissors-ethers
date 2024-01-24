import styled from 'styled-components';
import { ButtonWithBorder, commonBorder } from '../../../../../components';

export const ParticipateDialogBox = styled.div`
    padding: 15px;
    box-sizing: border-box;
    ${commonBorder}
    & > ${/* sc-sel */ ButtonWithBorder} {
        margin-top: 20px;
    }
`;

export const Wrap = styled.div`
 margin-bottom: 10px;
`;
