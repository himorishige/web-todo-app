/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Path, UseFormRegister } from 'react-hook-form';

type Inputs = {
  taskName: string;
};

export type Props = {
  placeholder: string;
  disabled?: boolean;
  label: Path<Inputs>;
  register: UseFormRegister<Inputs>;
  required: boolean;
};

const Input: React.VFC<Props> = ({
  placeholder,
  disabled = false,
  label,
  register,
  required,
  ...props
}: Props) => {
  return (
    <input
      type="text"
      css={inputStyle}
      placeholder={placeholder}
      disabled={disabled}
      {...register(label, { required })}
    />
  );
};

export default Input;

const inputStyle = css`
  -webkit-appearance: none;
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--primary-color);
  border-radius: 4px;
  &:disabled {
    background: #f8f8f8;
  }
`;
