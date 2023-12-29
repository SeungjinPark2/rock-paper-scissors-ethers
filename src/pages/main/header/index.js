import styled from 'styled-components';
import { Button, RowFlexBox } from '../../../components';
import { useMetaMask } from '../../../hooks/useMetaMask';
import { getSupportedNetworks } from '../../../ethereum';
import { useEffect, useState } from 'react';
import NetworksDropDown from './networks-dropdown';

const HeaderContainer = styled(RowFlexBox)`
    justify-content: space-between;
    align-items: center;
    background-color: #DBDBDB;
    box-sizing: border-box;
    padding: 10px;
    width: 100vw;
`;

function Header() {
    const {connectMetaMask} = useMetaMask();

    const supportedNetworks = getSupportedNetworks();
    // It's fine to access 0 index :)
    const [network, setNetwork] = useState(supportedNetworks[0]);
    
    return (
        <HeaderContainer>
            <div>RCP</div>
            <div>
                <NetworksDropDown networks={supportedNetworks} selectedNetwork={network} setNetwork={setNetwork}/>
                <Button onClick={() => {
                    connectMetaMask();
                }}>connect to metamask</Button>
            </div>
        </HeaderContainer>
    );
}

export default Header;