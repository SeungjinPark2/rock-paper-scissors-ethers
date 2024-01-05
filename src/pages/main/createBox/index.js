import DropDown from './dropdown';
import { useCallback, useState } from 'react';
import { Button, CreateBoxCard, Input, Label, Wrap } from './components';

function CreateBox() {
    const [betSize, setBetSize] = useState(0);

    const createGame = useCallback(async () => {
        try {
            // TODO: extract Expiration
            // const expiration = 60 * 5;
            // const bet = Web3.utils.toWei(parseFloat(betSize), 'ether');
            
            // const result = await contractObj.methods.createGame(expiration, bet).send({
            //     from: wallet.accounts[0],
            // });
            // console.dir(result, {depth: null});
        } catch (e) {
            console.error(e);
        }
    }, [betSize]);

    return (
        <CreateBoxCard>
            <div>
                <Wrap>
                    <span style={{ marginRight: '10px' }}>select network</span>
                    <DropDown />
                </Wrap>
                <Wrap>
                    <Label>
                        Set bet size of each player in ether
                        <Input 
                            type='number'
                            value={betSize}
                            onChange={e => setBetSize(e.target.value)}
                        />
                    </Label>
                </Wrap>
            </div>
            <Button onClick={async () =>{
                await createGame();
            }}>create a new game</Button>
        </CreateBoxCard>
    );
}

export default CreateBox;