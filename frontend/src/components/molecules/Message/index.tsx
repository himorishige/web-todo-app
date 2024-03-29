/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';
import { BsInfoCircle } from 'react-icons/bs';

type Props = {
  children: React.ReactNode;
};

const Message: React.VFC<Props> = memo((props) => {
  const { children } = props;

  return (
    <div css={messageWrapper}>
      <BsInfoCircle />
      <p data-testid="info-message">{children}</p>
    </div>
  );
});

export default Message;

const messageWrapper = css`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--primary-color);
  border-radius: 4px;

  p {
    margin-left: 1rem;
    line-height: 1.5;
  }
`;
