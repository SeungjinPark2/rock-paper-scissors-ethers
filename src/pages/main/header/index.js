import styled from 'styled-components';
import { Button, RowFlexBox } from '../../../components';

const HeaderContainer = styled(RowFlexBox)`
    justify-content: space-between;
    align-items: center;
    background-color: #DBDBDB;
    box-sizing: border-box;
    padding: 10px;
    width: 100vw;
`;

function Header() {
    return (
        <>
            <HeaderContainer>
                <div>RCP</div>
                <Button>connect to metamask</Button>
            </HeaderContainer>
        </>
    );
}

export default Header;