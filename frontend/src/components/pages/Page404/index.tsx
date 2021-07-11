/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Layout } from 'src/components/templates';

type Props = {};

const Page404: React.VFC<Props> = () => {
  return (
    <Layout>
      <div css={footerStyle}>404</div>
    </Layout>
  );
};

export default Page404;

const footerStyle = css`
  display: flex;
  align-items: center;
  padding: 1rem;
`;
