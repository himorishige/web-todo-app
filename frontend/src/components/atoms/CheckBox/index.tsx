/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';

export type Props = {
  isCompleted?: boolean;
  disabled?: boolean;
  onChange?: () => void;
};

const CheckBox: React.VFC<Props> = memo((props) => {
  const { isCompleted = false, disabled = false, onChange } = props;

  return (
    <>
      <label css={checkBoxStyle}>
        <input
          type="checkbox"
          className="input"
          disabled={disabled}
          defaultChecked={isCompleted}
          onChange={onChange}
        />
        <span className="dummy-input" data-testid="checkbutton"></span>
      </label>
    </>
  );
});

export default CheckBox;

const checkBoxStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  .input {
    margin: 0;
    width: 0;
    opacity: 0;
  }

  .input:hover {
    background: rgba(0, 0, 0, 0.05) !important;
  }

  .input:hover > .dummy-input {
    transform: scale(1.1);
  }

  .input:focus + .dummy-input {
    transform: scale(1.1);
  }
  .input:checked + .dummy-input {
    background: var(--primary-color);
  }
  .input:checked + .dummy-input::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 35%;
    height: 4px;
    border-radius: 2px;
    transform: translate(-6px, 5px) rotateZ(-135deg);
    transform-origin: 2px 2px;
    background: #ffffff;
  }
  .input:checked + .dummy-input::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    height: 4px;
    border-radius: 2px;
    transform: translate(-6px, 5px) rotateZ(-45deg);
    transform-origin: 2px 2px;
    background: #ffffff;
  }
  .dummy-input {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 32px;
    height: 32px;
    border: solid 2px transparent;
    background: rgb(216, 179, 132, 0.5);
    border-radius: 50%;
    transition: all 0.15s linear;
  }
`;
