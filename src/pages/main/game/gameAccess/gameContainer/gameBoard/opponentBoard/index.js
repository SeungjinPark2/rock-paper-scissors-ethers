import { useCallback, useMemo } from 'react';
import { useGameValue } from '../../../../hooks/useGame';
import { eth } from 'web3';
import { Card, CardImg } from '../../component';
import { OpponentSpan, PlayerSidePane } from '../components';

function OpponentBoard({ opponent }) {
    const { phase } = useGameValue();

    const CardJsx = useCallback((imgName) => 
        <Card>
            <CardImg $imgName={imgName} $position={'relative'} />
        </Card>
    , []);

    const content = useMemo(() => {
        // participate phase
        if (phase === 0n) {
            if (opponent.player === '0x0000000000000000000000000000000000000000') {
                return 'Waiting for opponent...';
            }
        // bet phase
        } else if (phase === 1n) {
            if (opponent.betDone === false) {
                return 'Opponent is betting...';
            } else {
                return 'Opponent did bet';
            }
        // commit phase
        } else if (phase === 2n) {
            if (opponent.commit === eth.abi.encodeParameter('uint32', 0)) {
                return 'Opponent is setting card...';
            } else {
                return CardJsx('card.png'); 
            }
        // reveal phase 
        } else if (phase === 3n) {
            const img = opponent.hand === 0n ? 'card.png'
                : (opponent.hand === 1n ? 'rock.png' 
                    : (opponent.hand === 2n ? 'scissors.png' 
                        : 'paper.png'));
            return CardJsx(img);
        }


    }, [opponent, phase]);

    return (
        <PlayerSidePane>
            <OpponentSpan>opponent</OpponentSpan>
            {content}
        </PlayerSidePane>
    );
}

export default OpponentBoard;