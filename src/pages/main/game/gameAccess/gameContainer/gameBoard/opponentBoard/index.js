import { useMemo, useRef } from 'react';
import { useGameValue } from '../../../../hooks/useGame';
import { eth } from 'web3';
import { Card, CardImg } from '../../component';

function OpponentBoard({ opponent }) {
    const { phase } = useGameValue();

    const CardJsx = useRef(
        <Card>
            <CardImg $imgName={'card.png'} $position={'relative'} />
        </Card>
    );

    const content = useMemo(() => {
        // participate phase
        if (phase === 0n) {
            if (opponent.player === '0x0000000000000000000000000000000000000000') {
                return 'waiting for opponent...';
            }
        // bet phase
        } else if (phase === 1n) {
            if (opponent.betDone === false) {
                return 'opponent is betting...';
            } else {
                return 'opponent did bet';
            }
        // commit phase
        } else if (phase === 2n) {
            if (opponent.commit === eth.abi.encodeParameter('uint32', 0)) {
                return 'opponent is setting card...';
            } else {
                return CardJsx.current; 
            }
        // reveal phase 
        } else if (phase === 3n) {
            if (opponent.hand === 0n) {
                return CardJsx.current;
            }
        }


    }, [opponent, phase]);

    return (
        <>{content}</>
    );
}

export default OpponentBoard;