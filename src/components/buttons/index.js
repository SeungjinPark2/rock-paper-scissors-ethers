import styled from 'styled-components';
import { borderGradient } from '../css';

export const ButtonWithBorder = styled.button`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background: transparent;
    color: #FFFFFF;
    font-size: large;
    cursor: pointer;
    ${borderGradient}
`;

export const ClearedButton = styled.button`
    background-color: transparent;
    border: 1px solid #FFFFFF;
    color: #FFFFFF;
    box-sizing: border-box;
    cursor: pointer;
`;