import DropDown from './dropdown';
import { useCallback, useEffect, useState } from 'react';
import { CreateBoxCard, Input, Label, Wrap } from './components';
import Web3 from 'web3';
import { useMetaMask } from '../../../hooks/useMetaMask';
import { useContract } from '../../../hooks/useContract';
import { ButtonWithBorder } from '../../../components';

function CreateBox() {
    const { wallet } = useMetaMask(); 
    const [betSize, setBetSize] = useState(0);
    // TODO: If metamask is not installed, prevent.
    const { GameFactory } = useContract();

    useEffect(() => {
        if (GameFactory.currentProvider == null) {
            GameFactory.setProvider(window.ethereum);
        }

        return () => {
            GameFactory.removeAllListeners();
        };
    }, []);

    const createGame = useCallback(async () => {
        try {
            // TODO: extract Expiration
            const expiration = 60 * 5;
            const bet = Web3.utils.toWei(parseFloat(betSize), 'ether');
            
            await GameFactory.methods.createGame(expiration, bet).send({
                from: wallet.accounts[0],
            });
        } catch (e) {
            // TODO: handle error
            console.error(e);
        }
    }, [betSize, wallet]);

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
            <ButtonWithBorder onClick={async () =>{
                await createGame();
            }}>create a new game</ButtonWithBorder>
        </CreateBoxCard>
    );
}

export default CreateBox;