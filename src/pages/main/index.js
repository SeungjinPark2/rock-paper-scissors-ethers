import styled from 'styled-components';
import { ColumnFlexBox, Loader, MaskBackground, MessageBox } from '../../components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useNetworkValueContext } from '../../hooks/useEthereum';
import { useEffect, useState } from 'react';
import { useContract } from '../../hooks/useContract';
import { useMetaMask } from '../../hooks/useMetaMask';
import { eth } from 'web3';

const Container = styled(ColumnFlexBox)`
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #FFFFFF;
`;

function Main() {
    // const [closed, setClosed] = useState(false);
    const { wallet } = useMetaMask();
    const { wsProvider, connecting } = useNetworkValueContext();
    const { GameFactory } = useContract();
    const navigate = useNavigate();

    // // TODO: make it Context
    // // if error message is changed, set closed to false to render error box
    // useEffect(() => {
    //     setClosed(false);
    // }, [networkErrorMsg]);

    useEffect(() => {
        let subscription = null;

        if (wsProvider != null && wallet.accounts.length > 0) {
            if (GameFactory.currentProvider == null) {
                GameFactory.setProvider(wsProvider);
            }
            subscription = GameFactory.events.NewGame({ 
                // If we don't filter, NewGame event of other players will be captured on current user's page.
                filter: {
                    creator: [wallet.accounts[0]],
                },
            });
    
            subscription.on('data', (event) => {
                const gameAddress = eth.abi.decodeParameter('address', event.data);
                navigate(`in-game/${gameAddress}`);
            });
        }

        return () => {
            GameFactory.removeAllListeners();
            subscription?.unsubscribe();
        };
    }, [wsProvider, wallet]);

    return (
        <Container>
            {
                // error is truthy and closed is falsy
                // (!!networkErrorMsg && !closed) && (
                //     <MessageBox message={networkErrorMsg} setClosed={setClosed}/>
                // )
            }
            {
                (
                    connecting && <MaskBackground>
                        <Loader />
                    </MaskBackground>
                )
            }
            <Outlet />
        </Container>
    );
}

export default Main;
