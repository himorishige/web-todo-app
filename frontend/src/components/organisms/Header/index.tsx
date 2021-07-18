/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { HomeIcon, StarIcon } from 'src/components/atoms';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { selectStarStatus, toggleFilter } from 'src/features/tasks/tasksSlice';
import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Header: React.VFC<Props> = memo(() => {
  const dispatch = useAppDispatch();
  const starState = useAppSelector(selectStarStatus);

  // お気に入りリスト表示をトグルする
  const toggleHandler = useCallback(() => {
    dispatch(toggleFilter());
  }, [dispatch]);

  return (
    <div css={titleStyle}>
      <div css={innerStyle}>
        <Link to="/">
          <HomeIcon />
        </Link>
        <h1 css={headingStyle}>ToDo App</h1>
        <div css={starToggleStyle} onClick={toggleHandler} data-testid="toggle-button">
          <StarIcon status={+starState} />
        </div>
      </div>
    </div>
  );
});

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

const starToggleStyle = css`
  svg {
    width: 2rem;
    height: 2rem;
  }
`;
