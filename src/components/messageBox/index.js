import styled from 'styled-components';

const MessageCloseButton = styled.img`
    width: 10px;
    height: 10px;
    cursor: pointer;
    position: absolute;
    top: 5%;
    right: 2%;
`;
const MessageBoxBody = styled.div`
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    padding: 20px;
    background: transparent;
    border: 5px solid #D43333;
    color: #D43333;
`;

export function MessageBox({ message, setClosed }) {
    return (
        <MessageBoxBody>
            {message}
            <MessageCloseButton onClick={() => {
                setClosed(true);
            }} src={process.env.PUBLIC_URL + '/closeBtn.png'}/>
        </MessageBoxBody>
    );
}