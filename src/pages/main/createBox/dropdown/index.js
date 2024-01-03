import { useEffect } from 'react';
import styled from 'styled-components';
import { borderGradient } from '../../../../components';

const DropDownItem = styled.div`
    padding: 5px;
    &:first-child {
        border-bottom: none;
    }
    ${borderGradient}
`;

const DropDownContainer = styled.div`
    position: absolute;
    display: none;
    margin-top: 5px;
    background-color: #000000;
`;

const StyledDropDown = styled.div`
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    padding: 5px;
    &:hover > ${/* sc-sel */ DropDownContainer} {
        display: block;
    }
    ${borderGradient}
`;

const Arrow = styled.i`
    position: relative;
    border: solid #FFFFFF;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    margin-left: 5px;
    top: -3px;
`;

function DropDown ({ networks, selectedNetwork, setNetwork }) {
    // TODO: handle hasProvider properly
    const switchNetwork = async (network) => {
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: network.chainId }],
            });

            setNetwork(network);
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
                    setNetwork(network);
                } catch (addError) {
                    console.error(addError);
                }
            }
            console.error(switchError);
        }
    };

    useEffect(() => {
        switchNetwork(selectedNetwork);
    }, []);

    return (
        <StyledDropDown>
            {selectedNetwork.renderName}
            <Arrow />
            <DropDownContainer>
                {networks.map((network, i) => (
                    <DropDownItem key={i} onClick={async () =>{
                        // TODO: handle hasProvider properly
                        await switchNetwork(network);
                    }}>
                        {network.renderName}
                    </DropDownItem>
                ))}
            </DropDownContainer>
        </StyledDropDown>
    );
}

export default DropDown;