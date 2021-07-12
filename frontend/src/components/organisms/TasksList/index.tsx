/** @jsxImportSource @emotion/react */
import { TaskItem } from 'src/components/molecules';
import { useAppSelector, useAppDispatch } from 'src/app/hooks';
import { css } from '@emotion/react';
import {
  selectErrorMessage,
  selectStatus,
  selectTasks,
  updateTask,
} from 'src/features/tasks/tasksSlice';

const TasksList: React.VFC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const errorMessage = useAppSelector(selectErrorMessage);
  const tasks = useAppSelector(selectTasks.selectAll);

  // 完了フラグの管理
  const completedStateHandler = async (id: string, isCompleted: boolean) => {
    const result = await dispatch(
      updateTask({
        id: id,
        isCompleted: isCompleted,
      }),
    );

    if (updateTask.fulfilled.match(result)) {
      console.log('updated');
    }

    if (updateTask.rejected.match(result)) {
      console.log('not updated');
    }
  };

  // 優先度フラグの管理
  const priorityStateHandler = async (id: string, priority: number) => {
    const result = await dispatch(
      updateTask({
        id: id,
        priority: priority,
      }),
    );

    if (updateTask.fulfilled.match(result)) {
      console.log('updated');
    }

    if (updateTask.rejected.match(result)) {
      console.log('not updated');
    }
  };

  return (
    <div data-testid="tasks-area">
      {status === 'failed' ? (
        <div data-testid="tasks-net-error">
          <p>{errorMessage}</p>
        </div>
      ) : tasks.length ? (
        tasks.map((task) => (
          <div key={task.id} css={taskItemStyle} data-testid="task-item">
            <TaskItem
              id={task.id}
              title={task.title}
              isCompleted={task.isCompleted}
              priority={task.priority}
              completedStateHandler={completedStateHandler}
              priorityStateHandler={priorityStateHandler}
            />
          </div>
        ))
      ) : (
        <div data-testid="tasks-error">タスクがありません</div>
      )}
    </div>
  );
};

export default TasksList;

const taskItemStyle = css`
  margin: 0.5rem 0.5rem;
`;
