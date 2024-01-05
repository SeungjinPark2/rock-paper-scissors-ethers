import { useEffect, useState } from 'react';
import { getSupportedNetworks } from '../../../../ethereum';
import { Arrow, DropDownContainer, DropDownItem, StyledDropDown } from './components';
import { useWsProvider } from '../../../../hooks/useWsProvider';

function DropDown () {
    const { updateWsProvider } = useWsProvider();
    const supportedNetworks = getSupportedNetworks();
    // It's fine to access 0 index :)
    const [currentNetwork, setCurrentNetwork] = useState(supportedNetworks[0]);

    useEffect(() => {
        const switchNetwork = async () => {
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: currentNetwork.chainId }],
                });
            } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    try {
                        await ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: currentNetwork.chainId,
                                    chainName: currentNetwork.chainName,
                                    rpcUrls: [currentNetwork.rpcUrl],
                                    nativeCurrency: {
                                        symbol: currentNetwork.currencyInfo.symbol,
                                        name: currentNetwork.currencyInfo.name,
                                        decimals: currentNetwork.currencyInfo.decimals,
                                    },
                                },
                            ],
                        });
                    } catch (addError) {
                        console.error(addError);
                    }
                }
                console.error(switchError);
            }
        };

        switchNetwork();
        updateWsProvider(currentNetwork.websocketUrl);
    }, [currentNetwork]);

    return (
        <StyledDropDown>
            {currentNetwork.renderName}
            <Arrow />
            <DropDownContainer>
                {supportedNetworks.map((network, i) => (
                    <DropDownItem key={i} onClick={() =>{
                        setCurrentNetwork(network);
                    }}>
                        {network.renderName}
                    </DropDownItem>
                ))}
            </DropDownContainer>
        </StyledDropDown>
    );
}

export default DropDown;