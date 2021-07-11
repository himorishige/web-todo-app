/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { CheckBox, StarIcon } from 'src/components/atoms';

type Props = {
  onClick?: () => void;
};

const TaskItem: React.VFC<Props> = ({ ...props }) => {
  return (
    <div css={taskItemStyle}>
      <div css={itemLabelStyle}>
        <CheckBox />
        <div css={labelTextStyle}>
          <Link to="/">牛乳を買ってくる</Link>
        </div>
      </div>
      <div>
        <StarIcon />
      </div>
    </div>
  );
};

export default TaskItem;

const taskItemStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.25rem;
  background: #f8f8f8;
  border-radius: 4px;
`;

const itemLabelStyle = css`
  display: flex;
  width: 100%;
  align-items: center;
  label {
    flex-basis: 3rem;
  }
`;

const labelTextStyle = css`
  width: 100%;
  a {
    display: block;
    width: 100%;
    color: var(--black-color);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      color: var(--secondary-color);
    }
  }
`;
