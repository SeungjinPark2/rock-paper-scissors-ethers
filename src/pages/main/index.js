import styled from 'styled-components';
import { ColumnFlexBox, Loader, MaskBackground, MessageBox } from '../../components';
import { Outlet } from 'react-router-dom';
import { useNetworkValueContext } from '../../hooks/useEthereum';
import { useEffect, useState } from 'react';
import { useContract } from '../../hooks/useContract';
import { useMetaMask } from '../../hooks/useMetaMask';

const Container = styled(ColumnFlexBox)`
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #FFFFFF;
`;

function Main() {
    const [closed, setClosed] = useState(false);
    const { wallet } = useMetaMask();
    const { wsProvider, connecting, error, network } = useNetworkValueContext();
    const { GameFactory } = useContract();

    // TODO: make it Context
    // if error message is changed, set closed to false to render error box
    useEffect(() => {
        setClosed(false);
    }, [error]);

    useEffect(() => {
        GameFactory.setProvider(wsProvider);
        const subscription = GameFactory.events.NewGame({ 
            // If we don't filter, NewGame event of other players will be captured on current user's page.
            filter: {
                creator: [wallet.accounts[0]],
            },
        });

        subscription.on('data', (event) => {
            console.log(event.data);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [network]);

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
