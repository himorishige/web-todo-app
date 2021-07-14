/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Header, Footer } from 'src/components/organisms';
import { Helmet } from 'react-helmet-async';
import { SITE_NAME } from 'src/constants';

type Props = {
  pageTitle?: string;
  children: React.ReactNode;
};

const Layout: React.VFC<Props> = ({ pageTitle = 'No Title', children }) => {
  return (
    <div>
      <Helmet>
        <title>
          {pageTitle} | {SITE_NAME}
        </title>
      </Helmet>
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
  left: 0;
  width: 100%;
`;
