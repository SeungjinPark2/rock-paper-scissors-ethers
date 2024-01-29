import styled from 'styled-components';
import { ButtonWithBorder, DefaultDialog } from '../../../../../../components';
import { useGameValue } from '../../../hooks/useGame';
import useSelfOpponent from '../hooks/useSelfOpponent';

const WinningMsg = styled.div`
    font-size: 1.4rem;
    padding: 20px;
`;

function WinnerDialog({ setDialogOpen }) {
    const { winner } = useGameValue();
    const { self } = useSelfOpponent();

    return (
        <DefaultDialog>
            { winner === self.player 
                ? <WinningMsg>You win!</WinningMsg>
                : <WinningMsg>You loose..</WinningMsg>
            }
            <ButtonWithBorder onClick={(e) => {
                setDialogOpen(false);
            }}>close</ButtonWithBorder>
        </DefaultDialog>
    );
}

export default WinnerDialog;