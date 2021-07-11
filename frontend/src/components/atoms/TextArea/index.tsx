/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export type Props = {
  placeholder: string;
  disabled?: boolean;
  onChange?: () => void;
};

const TextArea: React.VFC<Props> = ({ placeholder, disabled = false, ...props }: Props) => {
  return <textarea css={textAreaStyle} placeholder={placeholder} disabled={disabled} />;
};

export default TextArea;

const textAreaStyle = css`
  width: 100%;
  height: 100%;
  min-height: 30vh;
  padding: 0.5rem 1rem;
  border: 2px solid #c5c5c5;
  border-radius: 4px;
  &:disabled {
    background: #f8f8f8;
  }
`;
