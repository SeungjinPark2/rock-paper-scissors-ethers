import { useEffect } from 'react';
import { Loader, MaskBackground } from '../../components';
import { useMetaMask } from '../../hooks/useMetaMask';
import Main from '../main';
import ErrorPage from '../error';

function MetaMaskConnector() {
    const { hasProvider, isConnecting, connectMetaMask } = useMetaMask();

    useEffect(() => {
        connectMetaMask();
    }, []);

    if (hasProvider == false) {
        return (
            <ErrorPage msg={'No MetaMask wallet was found. Please install MetaMask first. ;)'} />
        );
    } else {
        if (isConnecting) {
            return (
                <MaskBackground>
                    <Loader />
                </MaskBackground>
            );
        } else {
            return (
                <Main />
            );
        }
    }

}

export default MetaMaskConnector;