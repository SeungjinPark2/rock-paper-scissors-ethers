import { PaperImgContainer, RockImgContainer, ScissorsImgContainer } from './components';

function BackgruondImgs() {
    return (
        <>
            <RockImgContainer $imgName='rock.png' />
            <PaperImgContainer $imgName='paper.png' />
            <ScissorsImgContainer $imgName='scissors.png' />
        </>
    );
}

export default BackgruondImgs;