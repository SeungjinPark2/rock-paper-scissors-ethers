import { useEffect, useState } from 'react';
import { Loader, MaskBackground } from '../../components';
import { useMetaMask } from '../../hooks/useMetaMask';
import Main from '../main';
import ErrorPage from '../error';

function MetaMaskConnector() {
    const { hasProvider, connectMetaMask } = useMetaMask();
    const [ loading, setLoading ] = useState();

    useEffect(() => {
        connectMetaMask(setLoading);
    }, []);

    if (hasProvider == false) {
        return (
            <ErrorPage msg={'No MetaMask wallet was found. Please install MetaMask first. ;)'} />
        );
    } else {
        if (loading) {
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