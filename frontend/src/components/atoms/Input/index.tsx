/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

type Inputs = {
  taskName: string;
  taskMemo: string;
};

export type Props = {
  placeholder: string;
  defaultValue?: string;
  disabled?: boolean;
  maxLength?: number;
  label: Path<Inputs>;
  register: UseFormRegister<Inputs>;
  required: boolean;
};

const Input: React.VFC<Props> = memo(
  ({
    placeholder,
    defaultValue,
    disabled = false,
    maxLength = 40,
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
        defaultValue={defaultValue}
        disabled={disabled}
        maxLength={maxLength}
        {...register(label, { required })}
      />
    );
  },
);

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
