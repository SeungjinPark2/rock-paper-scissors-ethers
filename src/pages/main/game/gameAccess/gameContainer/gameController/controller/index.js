import { useEffect, useMemo, useState } from 'react';
import { useGameUpdate, useGameValue } from '../../../../hooks/useGame';
import { ControllerContainer, PhaseWrap, TimerContainer } from './components';
import ButtonContainer from './buttonContainer';

function Controller() {
    const { phaseExpiration, phase, expired } = useGameValue();
    const { setExpired } = useGameUpdate();
    const [ remainedTime, setRemainedTime ] = useState(0);
    
    useEffect(() => {
        let intervalRef;

        const calculatedRemained = parseInt(phaseExpiration) - Math.floor(Date.now() / 1000);

        if (calculatedRemained < 0) {
            setRemainedTime(0);
        } else {
            setRemainedTime(calculatedRemained);
            intervalRef = setInterval(() => {
                setRemainedTime((time) => time > 0 ? time - 1 : 0);
            }, 1000);
        }

        return () => {
            if (intervalRef != null) {
                clearInterval(intervalRef);
            }
        };
    }, [ phaseExpiration, phase ]);

    useEffect(() => {
        if (expired === true && remainedTime > 0) {
            setExpired(false);
        } else if (expired === false && remainedTime === 0){
            setExpired(true);
        }
    }, [ remainedTime, expired ]);

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
        } else if (phase === 3n) {
            return 'Reveal';
        }
    }, [phase]);

    return (
        <ControllerContainer>
            <TimerContainer>
                {minutes}:{seconds}
            </TimerContainer>
            <PhaseWrap>
                current phase: {phaseParsed}
            </PhaseWrap>
            <ButtonContainer />
        </ControllerContainer>
    );
}

export default Controller;