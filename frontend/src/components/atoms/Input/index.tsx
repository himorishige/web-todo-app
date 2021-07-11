/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export type Props = {
  placeholder: string;
  disabled?: boolean;
  onChange?: () => void;
};

const Input: React.VFC<Props> = ({ placeholder, disabled = false, ...props }: Props) => {
  return <input type="text" css={inputStyle} placeholder={placeholder} disabled={disabled} />;
};

export default Input;

const inputStyle = css`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 2px solid #c5c5c5;
  border-radius: 4px;
  &:disabled {
    background: #f8f8f8;
  }
`;