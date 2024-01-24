import styled from 'styled-components';
import { MaskBackground } from '../../components';

const ErrorContainer = styled.div`
    font-size: 1.8rem;
    color: #ffffff;
`;

export default function ErrorPage({ msg }) {
    return (
        <MaskBackground>
            <ErrorContainer>
                { msg }
            </ErrorContainer>
        </MaskBackground>
    );
}