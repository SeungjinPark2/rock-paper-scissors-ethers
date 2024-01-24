import styled from 'styled-components';
import { ClearedButton, ColumnFlexBox } from '../../../components';

export const MainWrap = styled(ColumnFlexBox)`
    align-items: center;
    backdrop-filter: blur(3px);
`;

export const Title = styled.div`
    font-size: 2.5rem;
`;

export const Description = styled.div`
    font-size: 1.5rem;
    margin-top: 30px;
`;

export const Button = styled(ClearedButton)`
    font-size: 1.5rem;
    width: 400px;
    margin-top: 200px;
    padding: 8px 0;
`;