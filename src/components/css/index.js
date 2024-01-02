import { css } from 'styled-components';

const borderGradient = css`
    border: 5px solid;
    border-image: linear-gradient(90deg, rgba(192,0,255,1) 0%, rgba(99,136,255,1) 50%, rgba(0,255,94,1) 100%);
    border-image-slice: 1;
`;

export default borderGradient;