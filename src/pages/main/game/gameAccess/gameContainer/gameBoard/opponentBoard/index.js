import { useMemo } from 'react';

function OpponentBoard({ opponent }) {
    const boardJsx = useMemo(() => {
        let jsx = <></>;

        if (opponent.betDone === false) {
            jsx = <>opponent is betting...</>;
        } else {
            jsx = <>opponent did bet</>;
        }

        return jsx;
    }, [opponent]);

    return (
        <>{boardJsx}</>
    );
}

export default OpponentBoard;