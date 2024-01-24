import { Card, CardContainer, CardImg } from './components';

function Deck() {
    return (
        <CardContainer>
            <Card draggable={true}><CardImg $imgName={'rock.png'} $position={'relative'}/></Card>
            <Card draggable={true}><CardImg $imgName={'paper.png'} $position={'relative'}/></Card>
            <Card draggable={true}><CardImg $imgName={'scissors.png'} $position={'relative'}/></Card>
        </CardContainer>
    );
}

export default Deck;