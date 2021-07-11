/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { BsTrash } from 'react-icons/bs';

type Props = {
  onClick?: () => void;
};

const TrashIcon: React.VFC<Props> = ({ ...props }) => {
  return (
    <div>
      <BsTrash css={defaultStyle} />
    </div>
  );
};

export default TrashIcon;

const defaultStyle = css`
  width: 1.5rem;
  height: 1.5rem;
  color: var(--primary-color);
  transition: transform 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(1.1);
  }
`;
