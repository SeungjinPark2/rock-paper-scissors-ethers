import { Arrow, DropDownContainer, DropDownItem, StyledDropDown } from './components';
import { useNetworkUpdateContext, useNetworkValueContext } from '../../../../../hooks/useEthereum';
import { useMetaMask } from '../../../../../hooks/useMetaMask';
import { useEffect } from 'react';

function DropDown ({ setLoading }) {
    const { switchOrAddNetwork } = useMetaMask();
    const { network, supportedNetworks } = useNetworkValueContext();
    const { updateNetwork } = useNetworkUpdateContext();

    const handleOnClick = async (e) => {
        const selectedNetworkName = e.target.textContent;
        if (selectedNetworkName !== network.renderName) {
            const selectedNetwork = supportedNetworks.find(s => s.renderName === selectedNetworkName);
            setLoading(true);
            await switchOrAddNetwork(selectedNetwork, setLoading);
            updateNetwork(selectedNetwork, setLoading);
        }
    };

    useEffect(() => {
        setLoading(true);
        switchOrAddNetwork(network, setLoading);
    }, []);

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