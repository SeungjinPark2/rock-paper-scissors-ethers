import styled from 'styled-components';

export const Loader = styled.span`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 6rem;
    margin-top: 3rem;
    margin-bottom: 3rem;

    &:before,
    &:after {
        content: "";
        position: absolute;
        border-radius: 50%;
        animation: pulsOut 1.8s ease-in-out infinite;
        filter: drop-shadow(0 0 1rem rgba(255, 255, 255, 0.75));
    }
    &:before {
        width: 100%;
        padding-bottom: 100%;
        box-shadow: inset 0 0 0 1rem #fff;
        animation-name: pulsIn;
    }
    &:after {
        width: calc(100% - 2rem);
        padding-bottom: calc(100% - 2rem);
        box-shadow: 0 0 0 0 #fff;
    }

    @keyframes pulsIn {
        0% {
        box-shadow: inset 0 0 0 1rem #fff;
        opacity: 1;
        }
        50%, 100% {
        box-shadow: inset 0 0 0 0 #fff;
        opacity: 0;
        }
    }

    @keyframes pulsOut {
        0%, 50% {
        box-shadow: 0 0 0 0 #fff;
        opacity: 0;
        }
        100% {
        box-shadow: 0 0 0 1rem #fff;
        opacity: 1;
        }
    }
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
