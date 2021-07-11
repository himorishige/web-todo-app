/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { BsTable } from 'react-icons/bs';
import { Link } from 'react-router-dom';

type Props = {};

const Header: React.VFC<Props> = () => {
  return (
    <div css={titleStyle}>
      <div>
        <Link to="/">
          <BsTable css={iconStyle} />
        </Link>
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
  padding: 0.75rem 1.25rem;
  a {
    color: var(--black-color);
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
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
