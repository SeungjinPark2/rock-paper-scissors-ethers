import styled from 'styled-components';
import { commonBorder } from '../css';

export const ClearedInput = styled.input`
    background-color: transparent;
    ${commonBorder};
    box-sizing: border-box;
    color: #FFFFFF;
    padding: 5px;
    &:focus {
        outline: none;
    };
`;