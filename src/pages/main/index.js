import styled from 'styled-components';
import { Button, ColumnFlexBox } from '../../components';
import Header from './header';

const Container = styled(ColumnFlexBox)`
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const ButtonContainer = styled(ColumnFlexBox)`
    justify-content: center;
    height: 100%;
`;

function Main() {
    return (
        <>
            <Container>
                <div style={{ flexGrow: 0 }}>
                    <Header />
                </div>
                <div style={{ flexGrow: 1 }}>
                    <ButtonContainer>
                        <Button>create game!</Button>
                    </ButtonContainer>
                </div>
            </Container>
        </>
    );
}

export default Main;
