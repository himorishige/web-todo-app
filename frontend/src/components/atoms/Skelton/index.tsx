/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, keyframes } from '@emotion/react';

export type Props = {
  height?: string;
  width?: string;
  radius?: string;
};

const Skelton: React.VFC<Props> = (props) => {
  const { height = '4rem', width = '100%', radius = '0' } = props;

  return (
    <div
      css={skeltonStyle}
      style={{ width: `${width}`, height: `${height}`, borderRadius: `${radius}` }}
    />
  );
};

export default Skelton;

const skeltonAnimation = keyframes`
  0% {
    transform: translateX(-100%)
  }
  100% {
    transform: translateX(100%)
  }
`;

const skeltonStyle = css`
  width: 100%;
  height: 4rem;
  line-height: 2;
  background: rgba(206, 229, 208, 1);
  position: relative;
  overflow: hidden;
  margin: 0;
  &::before {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, transparent, rgba(218, 218, 218, 0.4), transparent);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    animation: ${skeltonAnimation} 1.2s linear infinite;
  }
`;
