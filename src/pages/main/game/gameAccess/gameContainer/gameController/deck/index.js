import { Card, CardImg } from '../../component';
import { CardContainer } from './components';

function Deck() {
    const onDragHandler = (ev) => {
        ev.dataTransfer.setData('text/plain', ev.target.id);
    };
    return (
        <CardContainer>
            <Card draggable={true} id='rock' onDragStart={onDragHandler}>
                <CardImg $imgName={'rock.png'} $position={'relative'}/>
            </Card>
            <Card draggable={true} id='paper' onDragStart={onDragHandler}>
                <CardImg $imgName={'paper.png'} $position={'relative'}/>
            </Card>
            <Card draggable={true} id='scissors' onDragStart={onDragHandler}>
                <CardImg $imgName={'scissors.png'} $position={'relative'}/>
            </Card>
        </CardContainer>
    );
}

export default Deck;