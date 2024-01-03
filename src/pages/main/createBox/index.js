import styled from 'styled-components';
import { ColumnFlexBox, borderGradient } from '../../../components';
import DropDown from './dropdown';
import { getSupportedNetworks } from '../../../ethereum';
import { useState } from 'react';

const CreateBoxCard = styled(ColumnFlexBox)`
    width: 300px;
    height: 250px;
    border-radius: 10px;
    padding: 15px;
    box-sizing: border-box;
    justify-content: space-between;
    ${borderGradient}
`;

const Button = styled.button`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background: transparent;
    color: #FFFFFF;
    font-size: large;
    cursor: pointer;
    ${borderGradient}
`;

const Label = styled.label``;

const Input = styled.input`
    background: transparent;
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin-top: 10px;
    color: #FFFFFF;
    padding: 5px;
    ${borderGradient}
`;

const Wrap = styled.div`
    padding: 5px 0px;
`;

function CreateBox() {
    const supportedNetworks = getSupportedNetworks();
    // It's fine to access 0 index :)
    const [network, setNetwork] = useState(supportedNetworks[0]);
    const [betSize, setBetSize] = useState(0);

    return (
        <CreateBoxCard>
            <div>
                <Wrap>
                    <span style={{ marginRight: '10px' }}>select network</span>
                    <DropDown networks={supportedNetworks} selectedNetwork={network} setNetwork={setNetwork} />
                </Wrap>
                <Wrap>
                    <Label>
                        Set bet size of each player in ether
                        <Input 
                            type='number'
                            defaultValue={betSize}
                            value={betSize}
                            onChange={e => setBetSize(e.target.value)}
                        />
                    </Label>
                </Wrap>
            </div>
            <Button>create a new game</Button>
        </CreateBoxCard>
    );
}

export default CreateBox;