/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';
import { Message } from 'src/components/molecules';
import { Layout } from 'src/components/templates';

const Page404: React.VFC = memo(() => {
  return (
    <Layout pageTitle="ページが見つかりませんでした">
      <div css={wrapperStyle}>
        <Message>
          404 Page Not Found...
          <br />
          ページが見つかりませんでした。
        </Message>
      </div>
    </Layout>
  );
});

export default Page404;

const wrapperStyle = css`
  display: flex;
  align-items: center;
  padding: 1rem;
`;
