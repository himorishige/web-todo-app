/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { BsFillStarFill } from 'react-icons/bs';

type Props = {
  status?: number;
  onClick?: () => void;
};

const StarIcon: React.VFC<Props> = (props) => {
  const { status, onClick } = props;

  return (
    <div css={wrapper} onClick={onClick}>
      <BsFillStarFill css={[defaultStyle, status ? onStyle : offStyle]} />
    </div>
  );
};

export default StarIcon;

const wrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const defaultStyle = css`
  width: 1.5rem;
  height: 1.5rem;
  color: #c5c5c5;
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
  color: #ffbb00;
`;

const offStyle = css`
  transition: color 0.3s;
  color: #c5c5c5;
`;
