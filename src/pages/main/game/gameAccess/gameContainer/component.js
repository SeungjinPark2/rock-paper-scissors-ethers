import styled, { css } from 'styled-components';
import { ImgContainerDefault, RowFlexBox, commonBorder } from '../../../../../components';

const hover = css`
    &:hover {
        cursor: pointer;
        transform: scale(1.1, 1.1);
    }
`;

export const Card = styled(RowFlexBox)`
    width: 100px;
    height: 140px;
    box-sizing: border-box;
    ${commonBorder};
    background-color: #000000;
    align-items: center;
    justify-content: center;

    ${props => props.$revealable && hover}
`;

export const CardImg = styled(ImgContainerDefault)`
    background-size: 80px 80px;
    translate: inherit;
    width: 80px;
    height: 80px;
`;