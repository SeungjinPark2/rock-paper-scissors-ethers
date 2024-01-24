import { ButtonWithBorder } from '../../../../../../../../components';
import { ButtonBox } from './components';

function ButtonContainer() {
    return (
        <ButtonBox>
            <ButtonWithBorder>Claim</ButtonWithBorder>
            <ButtonWithBorder>Bet</ButtonWithBorder>
            <ButtonWithBorder>Reveal</ButtonWithBorder>
        </ButtonBox>
    );
}

export default ButtonContainer;