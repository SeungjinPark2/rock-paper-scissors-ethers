import styled from 'styled-components';
import { ColumnFlexBox } from '../../components';
import { useMetaMask } from '../../hooks/useMetaMask';
import { MetamaskNotFound } from '../error';
import CreateBox from './createBox';

const Container = styled(ColumnFlexBox)`
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #FFFFFF;
`;

function Main() {
    const {wallet, hasProvider} = useMetaMask();

    return (
        <>
            {
                hasProvider == true ? (
                    <Container>
                        <CreateBox />
                    </Container>
                ) : <MetamaskNotFound />
            }
        </>
    );
}

export default Main;
