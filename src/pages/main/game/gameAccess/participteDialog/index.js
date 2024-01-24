import { utils } from 'web3';
import { ButtonLoader, ButtonWithBorder } from '../../../../../components';
import { ParticipateDialogBox, Wrap } from './components';
import { useCallback, useState } from 'react';
import { useGameUpdate, useGameValue } from '../../hooks/useGame';
import { useGameWithMetaMask } from '../../hooks/useGameWithMetaMask';
import { useMetaMask } from '../../../../../hooks/useMetaMask';

function ParticipateDialog () {
    const [ loading, setLoading ] = useState(false);
    const { player1, betSize } = useGameValue();
    const { setUserStatus } = useGameUpdate();
    const { GameWithMetaMask } = useGameWithMetaMask();
    const { wallet } = useMetaMask();

    const participate = useCallback(async () => {
        setLoading(true);

        try {
            await GameWithMetaMask.methods.participate().send({
                from: wallet.accounts[0],
            });
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
        setUserStatus('participant');
    }, [wallet]);

    return (
        <ParticipateDialogBox>
            <div>
                <Wrap>
                    opponent: {player1.player}
                </Wrap>
                <Wrap>
                    betting size: {utils.fromWei(betSize, 'ether')} ether
                </Wrap>
            </div>
            <ButtonWithBorder
                onClick={() => {
                    participate();
                }}
            >
                {
                    loading ? <ButtonLoader /> : <>PARTICIPATE GAME</>
                }
            </ButtonWithBorder>
        </ParticipateDialogBox>
    );
}

export default ParticipateDialog;