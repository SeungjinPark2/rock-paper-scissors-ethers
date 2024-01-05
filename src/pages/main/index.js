import styled from 'styled-components';
import { ColumnFlexBox, Loader, MaskBackground, MessageBox } from '../../components';
import { Outlet } from 'react-router-dom';
import { useWsProvider } from '../../hooks/useWsProvider';
import { useEffect, useState } from 'react';

const Container = styled(ColumnFlexBox)`
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #FFFFFF;
`;

function Main() {
    const [closed, setClosed] = useState(false);
    const { wsProvider, connecting, error } = useWsProvider();

    // if error message is changed, set closed to false to render error box
    useEffect(() => {
        setClosed(false);
    }, [error]);

    return (
        <Container>
            {
                // error is truthy and closed is falsy
                (!!error && !closed) && (
                    <MessageBox message={error} setClosed={setClosed}/>
                )
            }
            {
                connecting && (
                    <MaskBackground>
                        <Loader />
                    </MaskBackground>
                )
            }
            <Outlet />
        </Container>
    );
}

export default Main;
