import { css } from '@emotion/react';

export const globalStyle = css`
  :root {
    --base-color: #f3f0d7;
    --white-color: #ffffff;
    --black-color: #333333;
    --primary-color: #5e454b;
    --secondary-color: #d8b384;
  }

  *,
  *::after,
  *::before {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
  }

  body {
    line-height: 2;
    background: var(--base-color);
    color: var(--black-color);
  }
`;
