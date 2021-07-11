import { css } from '@emotion/react';

export const globalStyle = css`
  :root {
    --base-color: #f3f0d7;
    --white-color: #ffffff;
    --black-color: #5e454b;
    --primary-color: #5e454b;
    --secondary-color: #d8b384;
    --tertiary-color: #cee5d0;
  }

  *,
  *::after,
  *::before {
    font-size: 16px;
  }

  body {
    font-family: 'Helvetica Neue', 'Helvetica', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN',
      'Arial', 'Yu Gothic', 'Meiryo', sans-serif;
    font-size: 16px;
    line-height: 2;
    color: var(--black-color);
    background: var(--base-color);
  }
`;
