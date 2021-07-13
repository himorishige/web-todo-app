/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { BsTable } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { StarIcon } from 'src/components/atoms';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { selectStarStatus, toggleFilter } from 'src/features/tasks/tasksSlice';

type Props = {};

const Header: React.VFC<Props> = () => {
  const dispatch = useAppDispatch();
  const starState = useAppSelector(selectStarStatus);

  const toggleHandler = () => {
    dispatch(toggleFilter());
  };

  return (
    <div css={titleStyle}>
      <div css={innerStyle}>
        <div>
          <Link to="/">
            <BsTable css={iconStyle} />
          </Link>
        </div>
        <h1 css={headingStyle}>ToDo App</h1>
        <div css={starToggleStyle} onClick={toggleHandler}>
          <StarIcon status={+starState} />
        </div>
      </div>
    </div>
  );
};

export default Header;

const titleStyle = css`
  background: linear-gradient(to left, rgba(216, 179, 132, 1), rgba(216, 179, 132, 0.7));
`;

const innerStyle = css`
  max-width: 768px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

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

const starToggleStyle = css`
  svg {
    width: 2rem;
    height: 2rem;
  }
`;
