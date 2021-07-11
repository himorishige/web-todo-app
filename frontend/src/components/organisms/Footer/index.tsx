/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

type Props = {};

const Footer: React.VFC<Props> = () => {
  return <div css={footerStyle}>Footer</div>;
};

export default Footer;

const footerStyle = css`
  display: flex;
  align-items: center;
  padding: 1rem;
`;
