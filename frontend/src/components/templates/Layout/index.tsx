/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Header, Footer } from 'src/components/organisms';

type Props = {
  children: React.ReactNode;
};

const Layout: React.VFC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <main css={contentsStyle}>{children}</main>
      <footer css={footerStyle}>
        <Footer css={footerStyle} />
      </footer>
    </div>
  );
};

export default Layout;

const contentsStyle = css`
  max-width: 768px;
  margin: 0 auto;
  min-height: calc (100vh - 88px);
  position: relative;
  padding-bottom: 118px;
`;

const footerStyle = css`
  position: fixed;
  bottom: 0;
  width: 100%;
`;
