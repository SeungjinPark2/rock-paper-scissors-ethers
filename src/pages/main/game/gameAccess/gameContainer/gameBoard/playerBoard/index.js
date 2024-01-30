import { useCallback, useMemo } from 'react';
import { Card, CardImg } from '../../component';
import { eth } from 'web3';
import { useGameValue } from '../../../../hooks/useGame';
import { PlayerSidePane } from '../components';
import { useGameMethods } from '../../../../hooks/useGameMethods';

// setDialogOpen is state setter that triggers enabling to open winner dialog.
// this is prop-drilling, so consider detaching it.
function PlayerBoard({ self, setDialogOpen }) {
    const { phase, expired } = useGameValue();
    const { commit, reveal } = useGameMethods();

    const handleClick = useCallback(async () => {
        if (phase === 3n && self.hand === 0n && expired === false) {
            await reveal();
        }
        setDialogOpen(true);
    }, [phase, self, expired]);

    const handleDrop = useCallback(async (e) => {
        if (self.commit === eth.abi.encodeParameter('uint32', 0) && phase === 2n && expired === false) {
            const handData = e.dataTransfer.getData('text/plain');
            await commit(handData);
        }
    }, [phase, self, expired]);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const cardSettlement = useMemo(() => {
        let value = <></>;

        if (phase === 1n) {
            value = <>Please click button {"\"Bet\""} to proceed game.</>;
        } else if (phase === 2n && self.commit === eth.abi.encodeParameter('uint32', 0)) {
            value = <>Drag your card here!</>;
        } else {
            // if user committed at commit phase or reveal phase.
            const commitCondition = phase === 2n && self.commit !== eth.abi.encodeParameter('uint32', 0);
            const revealCondition = phase === 3n;
    
            const img = self.hand === 0n ? 'card.png'
                : (self.hand === 1n ? 'rock.png' 
                    : (self.hand === 2n ? 'scissors.png' 
                        : 'paper.png'));
    
            if (commitCondition || revealCondition) {
                value = (
                    <Card
                        $revealable={revealCondition}
                        onClick={handleClick}
                    >
                        <CardImg $imgName={img} $position={'relative'} />
                    </Card>
                );
            }
        }

        return value;
    }, [phase, self]);

    return (
        <PlayerSidePane
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            {cardSettlement}
        </PlayerSidePane>
    );
}

export default PlayerBoard;