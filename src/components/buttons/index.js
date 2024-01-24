import styled from 'styled-components';
import { commonBorder } from '../css';

export const ButtonWithBorder = styled.button`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background: transparent;
    color: #FFFFFF;
    font-size: large;
    cursor: pointer;
    ${commonBorder}
`;

export const ClearedButton = styled.button`
    background-color: transparent;
    ${commonBorder};
    color: #FFFFFF;
    box-sizing: border-box;
    cursor: pointer;
`;