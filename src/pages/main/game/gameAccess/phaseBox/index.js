import { useMemo } from 'react';
import { PhaseContainer } from './components';

function PhaseBox({ phase }) {
    const decodedPhase = useMemo(() => {
        if (phase === 0n) {
            return 'Participate';
        } else if (phase === 1n) {
            return 'Bet';
        } else if (phase === 2n) {
            return 'Commit';
        } else {
            return 'Reveal';
        }
    }, [ phase ]);

    return (
        <PhaseContainer>
            <div>Current Phase</div>
            <div>{decodedPhase}</div>
        </PhaseContainer>
    );
}

export default PhaseBox;