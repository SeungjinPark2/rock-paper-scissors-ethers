import { ButtonWithBorder } from '../../../../../../../../components';
import { useGameWithMetaMask } from '../../../../../hooks/useGameWithMetaMask';
import { ButtonBox } from './components';
import { useGameValue } from '../../../../../hooks/useGame';

function ButtonContainer() {
    const { GameWithMetaMask } = useGameWithMetaMask();
    const { userAddr, expired } = useGameValue();

    return (
        <ButtonBox>
            <ButtonWithBorder
                disabled={!expired}
                onClick={() => {console.log('claim!');}}
            >Claim</ButtonWithBorder>
        </ButtonBox>
    );
}

export default ButtonContainer;