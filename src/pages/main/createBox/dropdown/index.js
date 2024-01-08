import { useEffect } from 'react';
import { Arrow, DropDownContainer, DropDownItem, StyledDropDown } from './components';
import { useNetworkUpdateContext, useNetworkValueContext } from '../../../../hooks/useEthereum';

function DropDown () {
    const { network, supportedNetworks } = useNetworkValueContext();
    const { updateNetwork } = useNetworkUpdateContext();

    useEffect(() => {
        const switchNetwork = async () => {
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: network.chainId }],
                });
            } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    try {
                        await ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: network.chainId,
                                    chainName: network.chainName,
                                    rpcUrls: [network.rpcUrl],
                                    nativeCurrency: {
                                        symbol: network.currencyInfo.symbol,
                                        name: network.currencyInfo.name,
                                        decimals: network.currencyInfo.decimals,
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
    }, [network]);

    return (
        <StyledDropDown>
            {network.renderName}
            <Arrow />
            <DropDownContainer>
                {supportedNetworks.map((_network, i) => (
                    <DropDownItem key={i} onClick={() =>{
                        updateNetwork(_network);
                    }}>
                        {_network.renderName}
                    </DropDownItem>
                ))}
            </DropDownContainer>
        </StyledDropDown>
    );
}

export default DropDown;