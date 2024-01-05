import styled, { keyframes } from 'styled-components';
import { fixedCenterPosition } from '../css';
import { ColumnFlexBox } from '../containers';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const MaskBackground = styled(ColumnFlexBox)`
    width: 100vw;
    height: 100vh;
    ${fixedCenterPosition}
    background-color: rgba(0,0,0,0.7);
    z-index: 999;
    justify-content: center;
    align-items: center;
`;

export const Loader = styled.div`
    color: #313149;
    padding: 10px;
    display: inline-block;
    margin: 75px 0;
    position: relative;
    width: 125px;
    height: 125px;
    z-index: 0;
    animation: ${spin} 1s linear infinite;

    &::before {
        content: "";
        position: absolute;
        z-index: -1;
        inset: 0;
        padding: 15px;
        border-radius: 50%;
        background: linear-gradient(90deg, rgba(192,0,255,1) 0%, rgba(99,136,255,1) 50%, rgba(0,255,94,1) 100%);
        -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
                mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
                mask-composite: exclude;
    }
`;
