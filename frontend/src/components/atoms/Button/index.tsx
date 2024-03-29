/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';

export type Props = {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button: React.VFC<Props> = memo(
  ({ primary = false, size = 'medium', label, disabled = false, ...props }: Props) => {
    return (
      <button
        css={[buttonStyle, primary ? primaryStyle : secondaryStyle]}
        disabled={disabled}
        {...props}
      >
        {label}
      </button>
    );
  },
);

export default Button;

const buttonStyle = css`
  padding: 0 1rem;
  min-width: 80px;
  height: 54px;
  width: 100%;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  background: var(--secondary-color);
  transition: opacity 0.3s ease-in-out;
  color: var(--primary-color);
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    opacity: 0.8;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: var(--secondary-color);
    &:hover {
      opacity: 1;
    }
  }
`;

const primaryStyle = css`
  color: white;
  background: var(--primary-color);
`;

const secondaryStyle = css``;
