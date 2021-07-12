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
      {children}
      <footer css={footerStyle}>
        <Footer css={footerStyle} />
      </footer>
    </div>
  );
};

export default Layout;

const footerStyle = css`
  position: fixed;
  bottom: 0;
  width: 100%;
`;
