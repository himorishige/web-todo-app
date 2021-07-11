/** @jsxImportSource @emotion/react */
import { TaskItem } from 'src/components/molecules';
import { useAppSelector } from 'src/app/hooks';
import { css } from '@emotion/react';
import { selectErrorMessage, selectStatus, selectTasks } from 'src/features/tasks/tasksSlice';
import { Spinner } from 'src/components/atoms';

const TasksList: React.VFC = () => {
  const status = useAppSelector(selectStatus);
  const errorMessage = useAppSelector(selectErrorMessage);
  const tasks = useAppSelector(selectTasks.selectAll);

  return (
    <div data-testid="tasks-area">
      {status === 'failed' ? (
        <div data-testid="tasks-net-error">
          <p>{errorMessage}</p>
        </div>
      ) : status === 'loading' ? (
        <div css={loadingStyle}>
          <Spinner />
        </div>
      ) : tasks.length ? (
        tasks.map((task) => (
          <div key={task.id} css={taskItemStyle} data-testid="task-item">
            <TaskItem />
          </div>
        ))
      ) : (
        <div data-testid="tasks-error">タスクがありません</div>
      )}
    </div>
  );
};

export default TasksList;

const loadingStyle = css`
  width: 100%;
  height: calc(100vh - 96px - 118px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const taskItemStyle = css`
  margin: 0.5rem 0.5rem;
`;
