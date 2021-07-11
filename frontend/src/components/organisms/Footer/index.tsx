/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Input } from 'src/components/atoms';
import { useToast } from 'src/hooks/useToast';

type Props = {};

const Footer: React.VFC<Props> = () => {
  const { showToast } = useToast();

  const submitHandler = () => {
    showToast('SUCCESS', 'タスクを登録しました');
  };

  return (
    <div css={footerStyle}>
      <div css={inputWrapper}>
        <Input placeholder="タスクを入力してください" />
      </div>
      <div css={buttonWrapper}>
        <Button primary label="登録" onClick={submitHandler} />
      </div>
    </div>
  );
};

export default Footer;

const footerStyle = css`
  position: fixed;
  background: var(--tertiary-color);
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.25rem;
`;

const inputWrapper = css`
  width: 100%;
`;

const buttonWrapper = css`
  padding-left: 1rem;
`;
