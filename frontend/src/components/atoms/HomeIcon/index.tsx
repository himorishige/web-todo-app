/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';
import { BsTable } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const HomeIcon: React.VFC = memo(() => {
  return (
    <div>
      <Link to="/">
        <BsTable css={iconStyle} />
      </Link>
    </div>
  );
});

export default HomeIcon;

const iconStyle = css`
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
`;
