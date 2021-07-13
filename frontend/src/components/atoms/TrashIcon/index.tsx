/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';
import { BsTrash } from 'react-icons/bs';

const TrashIcon: React.VFC = memo(() => {
  return (
    <div>
      <BsTrash css={defaultStyle} />
    </div>
  );
});

export default TrashIcon;

const defaultStyle = css`
  width: 2.5rem;
  height: 2.5rem;
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
