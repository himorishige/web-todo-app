/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { BsTable } from 'react-icons/bs';

type Props = {};

const Header: React.VFC<Props> = () => {
  return (
    <div css={titleStyle}>
      <div>
        <BsTable css={iconStyle} />
      </div>
      <h1 css={headingStyle}>ToDo App</h1>
    </div>
  );
};

export default Header;

const titleStyle = css`
  display: flex;
  align-items: center;
  background: linear-gradient(to left, rgba(216, 179, 132, 1), rgba(216, 179, 132, 0.7));
  padding: 1rem;
`;

const headingStyle = css`
  font-family: 'Poppins', sans-serif;
  margin: 0;
`;

const iconStyle = css`
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
`;
