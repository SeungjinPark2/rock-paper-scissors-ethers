import { useEffect, useMemo, useState } from 'react';
import { useGameValue } from '../../../../hooks/useGame';
import { ControllerContainer, TimerContainer } from './components';
import ButtonContainer from './buttonContainer';

function Controller() {
    const { phaseExpiration, phase } = useGameValue();
    const [ remainedTime, setRemainedTime ] = useState(0);

    useEffect(() => {
        let intervalRef;

        const calculatedRemained = parseInt(phaseExpiration) - Math.floor(Date.now() / 1000);
        console.log(phaseExpiration);
        console.log(calculatedRemained);

        if (calculatedRemained < 0) {
            setRemainedTime(0);
        } else {
            setRemainedTime(calculatedRemained);
            intervalRef = setInterval(() => {
                setRemainedTime((time) => time - 1);
            }, 1000);
        }

        return () => {
            if (intervalRef != null) {
                clearInterval(intervalRef);
            }
        };
    }, [ phaseExpiration, phase ]);

    const { minutes, seconds } = useMemo(() => {
        const divided = Math.floor(remainedTime / 60);
        const _minutes = divided.toString().length === 1
            ? '0' + divided
            : divided.toString();
        const _seconds = (remainedTime - 60 * _minutes).toString().length === 1
            ? '0' + (remainedTime - 60 * _minutes).toString()
            : (remainedTime - 60 * _minutes).toString();
        return {
            minutes: _minutes,
            seconds: _seconds,
        };
    }, [remainedTime]);

    const phaseParsed = useMemo(() => {
        if (phase === 0n) {
            return 'Participate';
        } else if (phase === 1n) {
            return 'Bet';
        } else if (phase === 2n) {
            return 'Commit';
        } else {
            return 'Reveal';
        }
    }, []);

    return (
        <ControllerContainer>
            <TimerContainer>
                {minutes}:{seconds}
            </TimerContainer>
            <div>
                current phase: {phaseParsed}
            </div>
            <ButtonContainer />
        </ControllerContainer>
    );
}

export default Controller;