import { useCallback } from 'react';
import { Arrow, DropDownContainer, DropDownItem, StyledDropDown } from './components';
import { useNetworkUpdateContext, useNetworkValueContext } from '../../../../../hooks/useEthereum';

function DropDown () {
    const { network, supportedNetworks } = useNetworkValueContext();
    const { updateNetwork } = useNetworkUpdateContext();

    const switchNetwork = useCallback(async (network) => {
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: network.chainId }],
            });
            // if succeed to switch without error -> update network
            updateNetwork(network);
        } catch (switchError) {
            // user denied
            if (switchError.code === 4001) {
                // do nothing
            }
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
                    // if succeed to add without error -> update network
                } catch (addError) {
                    // console.error(addError);
                }
            }
        }
    }, []);

    const handleOnClick = async (e) => {
        // console.log(network.renderName);
        const selectedNetworkName = e.target.textContent;
        if (selectedNetworkName !== network.renderName) {
            const selectedNetwork = supportedNetworks.find(s => s.renderName === selectedNetworkName);
            await switchNetwork(selectedNetwork);
        }
    };

    return (
        <StyledDropDown>
            {network.renderName}
            <Arrow />
            <DropDownContainer>
                {supportedNetworks.map((_network, i) => (
                    <DropDownItem key={i} onClick={handleOnClick}>
                        {_network.renderName}
                    </DropDownItem>
                ))}
            </DropDownContainer>
        </StyledDropDown>
    );
}

export default DropDown;