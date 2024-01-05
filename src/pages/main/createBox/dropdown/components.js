import styled from 'styled-components';
import { borderGradient } from '../../../../components';

export const DropDownItem = styled.div`
    padding: 5px;
    &:first-child {
        border-bottom: none;
    }
    ${borderGradient}
`;

export const DropDownContainer = styled.div`
    position: absolute;
    display: none;
    margin-top: 5px;
    background-color: #000000;
`;

export const StyledDropDown = styled.div`
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    padding: 5px;
    &:hover > ${/* sc-sel */ DropDownContainer} {
        display: block;
    }
    ${borderGradient}
`;

export const Arrow = styled.i`
    position: relative;
    border: solid #FFFFFF;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    margin-left: 5px;
    top: -3px;
`;
