import { useState } from 'react';
import { Button, Description, MainWrap, Title } from './components';
import { MaskBackground } from '../../../components';
import CreateDialog from './createDialog';
import BackgruondImgs from './backgroundImg';

function MainPage() {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <BackgruondImgs />
            <MainWrap>
                {
                    opened && (
                        <MaskBackground>
                            <CreateDialog setOpened={setOpened} />
                        </MaskBackground>
                    )
                }
                <Title>
                    Rock Paper Scissors
                </Title>
                <Description>
                    Play rock paper scissors betting your cryptocurrency
                </Description>
                <Button onClick={() => {
                    setOpened(true);
                }}>
                    GET STARTED
                </Button>
            </MainWrap>
        </>
    );
}

export default MainPage;