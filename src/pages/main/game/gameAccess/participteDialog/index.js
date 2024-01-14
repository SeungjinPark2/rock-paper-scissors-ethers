import { utils } from 'web3';
import { ButtonWithBorder } from '../../../../../components';
import { ParticipateDialogBox } from './components';
import { useCallback, useState } from 'react';
import { useGameUpdate, useGameValue } from '../../hooks/useGame';
import { useGameWithMetaMask } from '../../hooks/useGameWithMetaMask';
import { useMetaMask } from '../../../../../hooks/useMetaMask';

function ParticipateDialog () {
    const [ requestOnGoing, setrequestOnGoing ] = useState(false);
    const { player1, betSize } = useGameValue();
    const { setUserStatus } = useGameUpdate();
    const { GameWithMetaMask } = useGameWithMetaMask();
    const { wallet } = useMetaMask();

    const participate = useCallback(async () => {
        setrequestOnGoing(true);

        try {
            const result = await GameWithMetaMask.methods.participate().send({
                from: wallet.accounts[0],
            });
            console.log(result);
        } catch (error) {
            console.error(error);
        }

        setrequestOnGoing(false);
        setUserStatus('participant');
    }, [wallet]);

    return (
        <ParticipateDialogBox>
            { requestOnGoing === true && (
                <div>please change me to loading</div>
            ) }
            <div>
                <div>
                    opponent: {player1.player}
                </div>
                <div>
                    betting size: {utils.fromWei(betSize, 'ether')} ether
                </div>
            </div>
            <ButtonWithBorder onClick={() => {
                participate();
            }}>participate</ButtonWithBorder>
        </ParticipateDialogBox>
    );
}

export default ParticipateDialog;