import styled from 'styled-components';
import { ColumnFlexBox, Loader, MaskBackground, MessageBox } from '../../components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useNetworkValueContext } from '../../hooks/useEthereum';
import { useEffect, useState } from 'react';
import { useContract } from '../../hooks/useContract';
import { useMetaMask } from '../../hooks/useMetaMask';
import Web3 from 'web3';
import ErrorPage from '../error';

const Container = styled(ColumnFlexBox)`
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #FFFFFF;
`;

function Main() {
    const [closed, setClosed] = useState(false);
    const { wallet, hasProvider } = useMetaMask();
    const { wsProvider, connecting, error, network } = useNetworkValueContext();
    const { GameFactory } = useContract();
    const navigate = useNavigate();

    // TODO: make it Context
    // if error message is changed, set closed to false to render error box
    useEffect(() => {
        setClosed(false);
    }, [error]);

    useEffect(() => {
        let subscription = null;

        if (wsProvider != null && wallet.accounts.length > 0) {
            GameFactory.setProvider(wsProvider);
            subscription = GameFactory.events.NewGame({ 
                // If we don't filter, NewGame event of other players will be captured on current user's page.
                filter: {
                    creator: [wallet.accounts[0]],
                },
            });
    
            subscription.on('data', (event) => {
                const gameAddress = new Web3().eth.abi.decodeParameter('address', event.data);
                navigate(`in-game/${gameAddress}`);
            });
        }

        return () => {
            subscription?.unsubscribe();
        };
    }, [network]);

    if (hasProvider === false) {
        return (
            <ErrorPage msg={'MetaMask is not found, please install MetaMask wallet first ;)'}/>
        );
    } else {
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
}

export default Main;
