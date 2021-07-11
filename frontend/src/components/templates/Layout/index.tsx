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
      <Footer />
    </div>
  );
};

export default Layout;
