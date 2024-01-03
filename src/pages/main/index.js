import styled from 'styled-components';
import { ColumnFlexBox } from '../../components';
import { Outlet } from 'react-router-dom';

const Container = styled(ColumnFlexBox)`
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #FFFFFF;
`;

function Main() {

    return (
        <Container>
            <Outlet />
        </Container>
    );
}

export default Main;
