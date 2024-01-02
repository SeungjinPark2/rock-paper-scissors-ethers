import styled from 'styled-components';

const ErrorContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export function MetamaskNotFound() {
    return (
        <ErrorContainer>
            Metamask is not found.. please install metamask wallet first
        </ErrorContainer>
    );
}