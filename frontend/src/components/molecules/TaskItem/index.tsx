/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { CheckBox, StarIcon } from 'src/components/atoms';
import { BsPencilSquare } from 'react-icons/bs';

type Props = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: number;
  completedStateHandler: (id: string, isCompleted: boolean) => Promise<void>;
  priorityStateHandler: (id: string, priority: number) => Promise<void>;
};

const TaskItem: React.VFC<Props> = (props) => {
  const {
    id,
    title,
    description,
    isCompleted,
    priority,
    completedStateHandler,
    priorityStateHandler,
  } = props;

  return (
    <div css={taskItemStyle}>
      <div css={itemLabelStyle}>
        <CheckBox
          isCompleted={isCompleted}
          onChange={() => completedStateHandler(id, !isCompleted)}
        />
        <div css={labelTextStyle}>
          <Link to={`/tasks/${id}`}>
            {title}
            {description ? <BsPencilSquare css={penStyle} /> : null}
          </Link>
        </div>
      </div>
      <div>
        <StarIcon status={priority} onClick={() => priorityStateHandler(id, +!priority)} />
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
    line-height: 1.5;
    &:hover {
      text-decoration: underline;
      color: var(--secondary-color);
    }
  }
`;

const penStyle = css`
  width: 1.15rem;
  height: 1.15rem;
  margin-left: 0.5rem;
  vertical-align: sub;
`;
