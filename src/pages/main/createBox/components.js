import styled from 'styled-components';
import { ColumnFlexBox, borderGradient } from '../../../components';

export const CreateBoxCard = styled(ColumnFlexBox)`
    width: 300px;
    height: 250px;
    border-radius: 10px;
    padding: 15px;
    box-sizing: border-box;
    justify-content: space-between;
    ${borderGradient}
`;

export const Button = styled.button`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background: transparent;
    color: #FFFFFF;
    font-size: large;
    cursor: pointer;
    ${borderGradient}
`;

export const Label = styled.label``;

export const Input = styled.input`
    background: transparent;
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin-top: 10px;
    color: #FFFFFF;
    padding: 5px;
    ${borderGradient}
`;

export const Wrap = styled.div`
    padding: 5px 0px;
`;