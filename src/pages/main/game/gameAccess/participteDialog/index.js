import { utils } from 'web3';
import { ButtonLoader, ButtonWithBorder } from '../../../../../components';
import { ParticipateDialogBox, Wrap } from './components';
import { useState } from 'react';
import { useGameValue } from '../../hooks/useGame';
import { useGameMethods } from '../../hooks/useGameMethods';

function ParticipateDialog () {
    const [ loading, setLoading ] = useState(false);
    const { player1, betSize } = useGameValue();
    const { participate } = useGameMethods();

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
                    participate(setLoading);
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