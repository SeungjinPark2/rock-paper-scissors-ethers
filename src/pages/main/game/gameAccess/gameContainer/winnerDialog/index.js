import styled from 'styled-components';
import { ButtonWithBorder, DefaultDialog } from '../../../../../../components';
import { useGameValue } from '../../../hooks/useGame';
import useSelfOpponent from '../hooks/useSelfOpponent';
import { useMemo } from 'react';

const WinningMsg = styled.div`
    font-size: 1.4rem;
    padding: 20px;
`;

function WinnerDialog({ setDialogOpen }) {
    const { winner } = useGameValue();
    const { self } = useSelfOpponent();

    const message = useMemo(() => {
        if (winner === 'tied') {
            return 'Game tied, commit again!';
        } else if (winner === self.player) {
            return 'You won!';
        } else {
            return 'You lost..';
        }
    }, [winner, self]);

    return (
        <DefaultDialog>
            <WinningMsg>{message}</WinningMsg>
            <ButtonWithBorder onClick={(e) => {
                setDialogOpen(false);
            }}>close</ButtonWithBorder>
        </DefaultDialog>
    );
}

export default WinnerDialog;