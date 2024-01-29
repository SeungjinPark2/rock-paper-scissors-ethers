import { ButtonWithBorder } from '../../../../../../../../components';
import { ButtonBox } from './components';
import { useGameValue } from '../../../../../hooks/useGame';
import { useGameMethods } from '../../../../../hooks/useGameMethods';
import useSelfOpponent from '../../../hooks/useSelfOpponent';
import { useMemo } from 'react';

function ButtonContainer() {
    const { expired, phase } = useGameValue();
    const { self } = useSelfOpponent();
    const { bet } = useGameMethods();

    const shouldBetButtonRender = useMemo(() => 
        expired === false
        && self.betDone === false
        && phase === 1n
    , [expired, phase, self.betDone === false]);

    const shouldClaimButtonRender = useMemo(() =>
        expired === true
        && phase !== 0n
    , [expired, phase]);

    return (
        <ButtonBox>
            {
                shouldClaimButtonRender && (
                    <ButtonWithBorder
                        onClick={() => {console.log('claim!');}}
                    >
                        Claim
                    </ButtonWithBorder>
                )
            }
            {
                shouldBetButtonRender && (
                    <ButtonWithBorder
                        onClick={async () => {
                            await bet();
                        }}
                    >
                        Bet
                    </ButtonWithBorder>
                )
            }
        </ButtonBox>
    );
}

export default ButtonContainer;