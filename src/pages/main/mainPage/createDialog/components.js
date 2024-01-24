import styled from 'styled-components';
import { ClearedButton, ClearedInput, DefaultDialog, RowFlexBox } from '../../../../components';

export const Dialog = styled(DefaultDialog)`
    height: 180px;
    background-color: #000000;
    justify-content: space-between;
    font-size: 1.1rem;
`;

export const Input = styled(ClearedInput)`
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin-top: 5px;
`;

export const DropBoxWrap = styled(RowFlexBox)`
    align-items: center;
`;

export const BetSizeWrap = styled.div`
    margin-top: 5px;
`;

export const Button = styled(ClearedButton)`
    padding: 5px 10px;
    font-size: 1rem;
`;

export const ButtonBox = styled(RowFlexBox)`
    flex-flow: row-reverse;
    & > ${/* sc-sel */ Button} {
        margin-left: 5px;
    };
`;

export const ButtonLoader = styled.span`
    width: 15px;
    height: 15px;
    border: 2px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

