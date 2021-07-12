/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, keyframes } from '@emotion/react';

type TOAST_TYPE = 'SUCCESS' | 'FAIL';

const ToastContext = React.createContext({
  showToast: (toastType: TOAST_TYPE, message: string) => {
    console.log(message);
  },
});

type Props = {
  children: React.ReactNode;
};

export const ToastProvider: React.VFC<Props> = (props) => {
  const [state, update] = React.useState({
    show: false,
    message: 'message',
    toastType: 'SUCCESS',
  });

  const showToast = (toastType: TOAST_TYPE, message: string) => {
    update({ show: true, message, toastType });
    setTimeout(() => update({ ...state, show: false, message: message }), 4000);
  };

  return (
    <>
      <ToastContext.Provider value={{ showToast }}>{props.children}</ToastContext.Provider>
      {state.show && (
        <div css={[toastStyle, state.toastType === 'FAIL' && failStyle]}>{state.message}</div>
      )}
    </>
  );
};

export const useToast = () => React.useContext(ToastContext);

const FadeIn = keyframes`
from {
  opacity: 0;
  top: 1rem;
}
to {
  opacity: 1;
  top: 2rem;
}
`;

const FadeOut = keyframes`
from {
  opacity: 1;
  top: 2rem;
}
to {
  opacity: 0;
  top: 1rem;
}
`;

const toastStyle = css`
  animation: ${FadeIn} 0.3s, ${FadeOut} 0.3s 3s forwards;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  min-height: 40px;
  background: var(--primary-color);
  padding: 1rem;
  top: 2rem;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 4px;
  color: white;
`;

const failStyle = css`
  background: red;
`;
