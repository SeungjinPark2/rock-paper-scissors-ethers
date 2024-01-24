import { PaperImgContainer, RockImgContainer, ScissorsImgContainer } from './components';

function BackgruondImgs() {
    return (
        <>
            <RockImgContainer $imgName='rock.png' $position='fixed' />
            <PaperImgContainer $imgName='paper.png' $position='fixed' />
            <ScissorsImgContainer $imgName='scissors.png' $position='fixed' />
        </>
    );
}

export default BackgruondImgs;