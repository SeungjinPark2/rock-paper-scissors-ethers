import styled from 'styled-components';
import { fixedCenterPosition } from '../css';

export const FlexBox = styled.div`
    display: flex;
`;

export const ColumnFlexBox = styled(FlexBox)`
    flex-direction: column;
`;

export const RowFlexBox = styled(FlexBox)`
    flex-direction: row;
`;

export const DefaultDialog = styled(ColumnFlexBox)`
    box-sizing: border-box;
    border: 1px solid #FFFFFF;
    padding: 20px;
`;

export const MaskBackground = styled(ColumnFlexBox)`
    width: 100vw;
    height: 100vh;
    ${fixedCenterPosition}
    background-color: rgba(0,0,0,0.7);
    z-index: 999;
    justify-content: center;
    align-items: center;
`;

export const ImgContainerDefault = styled.div`
    position: fixed;
    background-image: url(/images/${props => props.$imgName});
    background-position: center;
`;