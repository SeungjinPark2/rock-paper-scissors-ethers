import './style.css';

function NetworksDropDown({ networks, selectedNetwork, setNetwork }) {
    return (
        <div className='dropdown'>
            <div className=''>{selectedNetwork.chainName}</div>
            <div className='dropdown-container'>
                {networks.map((network, i) => (
                    <div style={{ display: 'block' }} key={i} onClick={() =>{
                        setNetwork(network);
                    }}>
                        {network.chainName}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NetworksDropDown;