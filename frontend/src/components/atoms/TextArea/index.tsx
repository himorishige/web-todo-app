/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

export type Props = {
  placeholder: string;
  defaultValue?: string;
  disabled?: boolean;
  label: Path<Inputs>;
  register: UseFormRegister<Inputs>;
  maxLength?: number;
  onChange?: () => void;
};

type Inputs = {
  taskName: string;
  taskMemo: string;
};

const TextArea: React.VFC<Props> = memo(
  ({
    placeholder,
    defaultValue,
    disabled = false,
    maxLength = 140,
    label,
    register,
    ...props
  }: Props) => {
    return (
      <textarea
        css={textAreaStyle}
        placeholder={placeholder}
        {...register(label)}
        disabled={disabled}
        maxLength={maxLength}
        defaultValue={defaultValue}
        data-testid="tasks-textarea"
      />
    );
  },
);

export default TextArea;

const textAreaStyle = css`
  width: 100%;
  height: 100%;
  min-height: 30vh;
  padding: 1rem;
  border: 2px solid var(--primary-color);
  border-radius: 4px;
  color: var(--primary-color);
  &:disabled {
    background: #f8f8f8;
  }
`;
