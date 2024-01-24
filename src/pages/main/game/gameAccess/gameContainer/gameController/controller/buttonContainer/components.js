import styled from 'styled-components';
import { ButtonWithBorder, RowFlexBox } from '../../../../../../../../components';

export const ButtonBox = styled(RowFlexBox)`
    padding: 10px;
    & > ${/* sc-sel */ButtonWithBorder} {
        margin: 5px;
    }
`;