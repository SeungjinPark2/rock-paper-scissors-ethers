import { useCallback, useState } from 'react';
import { ButtonWithBorder } from '../../../../../../../../components';
import { useGameWithMetaMask } from '../../../../../hooks/useGameWithMetaMask';
import { ButtonBox } from './components';
import { useGameValue } from '../../../../../hooks/useGame';
import Web3 from 'web3';

function ButtonContainer() {
    const { GameWithMetaMask } = useGameWithMetaMask();
    const { betSize, userAddr } = useGameValue();
    const [ requestOnGoing, setrequestOnGoing ] = useState(false);

    const doTheBet = useCallback(async () => {
        setrequestOnGoing(true);
        try {
            const result = await GameWithMetaMask.methods.bet().send({
                value: betSize,
                from: userAddr,
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
        setrequestOnGoing(false);
    }, [GameWithMetaMask, betSize, userAddr]);

    return (
        <ButtonBox>
            <ButtonWithBorder>Claim</ButtonWithBorder>
            <ButtonWithBorder onClick={() => {
                doTheBet();
            }}>Bet</ButtonWithBorder>
            <ButtonWithBorder onClick={() => {
                doTheBet();
            }}>Reveal</ButtonWithBorder>
        </ButtonBox>
    );
}

export default ButtonContainer;