import { useMetaMask } from '../../../../hooks/useMetaMask';
import { useContract } from '../../../../hooks/useContract';
import DropDown from './dropdown';
import { BetSizeWrap, Button, ButtonBox, ButtonLoader, Dialog, DialogBody, DropBoxWrap, Input } from './components';
import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';

function CreateDialog({ setOpened }) {
    const { wallet } = useMetaMask();
    const { GameFactory } = useContract();
    const [ betSize, setBetSize ] = useState(0);
    const [ loading, setLoading ] = useState(false);

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

    const handleOnChange = (e) => {
        if (e.target.value < 0) {
            setBetSize(0);
        } else {
            setBetSize(e.target.value);
        }
    };

    const handleClick = async () => {
        setLoading(true);
        try {
            await createGame();
        } catch (error) {
            setLoading(false);
        }
        setLoading(false);
        setOpened(false);
    };

    return (
        <Dialog>
            <div>
                <DropBoxWrap>
                    <span style={{
                        marginRight: '10px'
                    }}>select network</span>
                    <DropDown />
                </DropBoxWrap>
                <BetSizeWrap>
                    <span>set betting size in ETH you would pay</span>
                    <Input
                        type='number'
                        value={betSize}
                        onChange={handleOnChange}
                    />
                </BetSizeWrap>
            </div>
            <ButtonBox>
                <Button disabled={loading} onClick={handleClick}>
                    {
                        loading ? <ButtonLoader /> : <>START</>
                    }
                </Button>
                <Button
                    onClick={() => {
                        setOpened(false);
                    }}
                    disabled={loading}
                >
                    {
                        loading ? <ButtonLoader /> : <>CANCEL</>
                    }
                </Button>
            </ButtonBox>
        </Dialog>
    );
}

export default CreateDialog;