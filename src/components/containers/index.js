import styled from 'styled-components';

export const FlexBox = styled.div`
    display: flex;
`;

export const ColumnFlexBox = styled(FlexBox)`
    flex-direction: column;
`;

export const RowFlexBox = styled(FlexBox)`
    flex-direction: row;
`;
