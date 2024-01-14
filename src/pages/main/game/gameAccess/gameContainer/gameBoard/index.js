import { Pane, PlayerSidePane, Splitter } from './components';

function GameBoard({ player1, player2, userAddr }) {
    // const [self, setSelf] = useState(() => {
    //     return player1;
    // });

    return (
        <Pane>
            <PlayerSidePane>
                {
                    player1.player
                }
            </PlayerSidePane>
            <Splitter />
            <PlayerSidePane>
                {
                    player2.player
                }
            </PlayerSidePane>
        </Pane>
    );
}

export default GameBoard;