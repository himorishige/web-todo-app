/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';
import { BsStarFill, BsStar } from 'react-icons/bs';

type Props = {
  status?: number;
  onClick?: () => void;
};

const StarIcon: React.VFC<Props> = memo((props) => {
  const { status, onClick } = props;

  return (
    <>
      {status === 1 ? (
        <div css={wrapper} onClick={onClick}>
          <BsStarFill css={[defaultStyle, onStyle]} data-testid="star" />
        </div>
      ) : (
        <div css={wrapper} onClick={onClick}>
          <BsStar css={[defaultStyle, offStyle]} data-testid="star" />
        </div>
      )}
    </>
  );
});

export default StarIcon;

const wrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const defaultStyle = css`
  width: 1.5rem;
  height: 1.5rem;
  color: var(--primary-color);
  transition: transform 0.2s, color 0.3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(1.1);
  }
`;

const onStyle = css`
  transition: color 0.3s;
  color: #ffee00;
  filter: drop-shadow(0px 1px 2px rgba(44, 27, 31, 0.3));
  text-shadow: black;
  box-shadow: black;
`;

const offStyle = css`
  transition: color 0.3s;
  color: var(--primary-color);
`;
