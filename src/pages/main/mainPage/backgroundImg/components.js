import styled from 'styled-components';
import { ImgContainerDefault } from '../../../../components';

export const RockImgContainer = styled(ImgContainerDefault)`
    background-size: 200px 200px;
    width: 200px;
    height: 200px;
    bottom: 40%;
    left: 10%;
`;

export const PaperImgContainer = styled(ImgContainerDefault)`
    background-size: 200px 200px;
    width: 200px;
    height: 200px;
    top: 6%;
    right: 26%;
    transform: rotate(37deg);
`;

export const ScissorsImgContainer = styled(ImgContainerDefault)`
    background-size: 200px 200px;
    width: 200px;
    height: 200px;
    bottom: 10%;
    right: 15%;
    transform: rotate(60deg);
`;