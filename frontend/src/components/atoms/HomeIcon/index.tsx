/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';
import { BsTable } from 'react-icons/bs';

const HomeIcon: React.VFC = memo(() => {
  return (
    <div>
      <BsTable css={iconStyle} />
    </div>
  );
});

export default HomeIcon;

const iconStyle = css`
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
`;
