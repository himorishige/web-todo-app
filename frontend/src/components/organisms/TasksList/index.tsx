/** @jsxImportSource @emotion/react */
import { Message, TaskItem } from 'src/components/molecules';
import { useAppSelector, useAppDispatch } from 'src/app/hooks';
import { css } from '@emotion/react';
import {
  selectErrorMessage,
  selectStarStatus,
  selectStatus,
  selectTasks,
  updateTask,
} from 'src/features/tasks/tasksSlice';
import { useCallback } from 'react';

const TasksList: React.VFC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const starState = useAppSelector(selectStarStatus);
  const errorMessage = useAppSelector(selectErrorMessage);
  const tasks = useAppSelector(selectTasks.selectAll);

  // 完了フラグの管理
  const completedStateHandler = useCallback(
    async (id: string, isCompleted: boolean) => {
      await dispatch(
        updateTask({
          id: id,
          isCompleted: isCompleted,
        }),
      );
    },
    [dispatch],
  );

  // 優先度フラグの管理
  const priorityStateHandler = useCallback(
    async (id: string, priority: number) => {
      await dispatch(
        updateTask({
          id: id,
          priority: priority,
        }),
      );
    },
    [dispatch],
  );

  // APIからの取得に失敗した場合
  if (status === 'failed') {
    return (
      <div data-testid="tasks-area">
        <div css={message} data-testid="tasks-net-error">
          <Message>{errorMessage}</Message>
        </div>
      </div>
    );
  }

  // APIからの取得に成功した場合
  return (
    <>
      {tasks.length && starState ? (
        // お気に入りタスクの表示
        <div data-testid="tasks-area">
          {tasks.filter((task) => task.priority === 1).length ? (
            tasks
              .filter((task) => task.priority === 1)
              .map((task) => (
                <div key={task.id} css={taskItemStyle} data-testid="task-item">
                  <TaskItem
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    isCompleted={task.isCompleted}
                    priority={task.priority}
                    completedStateHandler={completedStateHandler}
                    priorityStateHandler={priorityStateHandler}
                  />
                </div>
              ))
          ) : (
            <div data-testid="tasks-area">
              <div css={message} data-testid="tasks-error">
                <Message>登録されているお気に入りのタスクはありません</Message>
              </div>
            </div>
          )}
        </div>
      ) : tasks.length ? (
        // 登録されている全タスクの表示
        <div data-testid="tasks-area">
          {tasks.map((task) => (
            <div key={task.id} css={taskItemStyle} data-testid="task-item">
              <TaskItem
                id={task.id}
                title={task.title}
                description={task.description}
                isCompleted={task.isCompleted}
                priority={task.priority}
                completedStateHandler={completedStateHandler}
                priorityStateHandler={priorityStateHandler}
              />
            </div>
          ))}
        </div>
      ) : (
        <div data-testid="tasks-area">
          <div css={message} data-testid="tasks-error">
            <Message>登録されているタスクはありません</Message>
          </div>
        </div>
      )}
    </>
  );
};

export default TasksList;

const taskItemStyle = css`
  margin: 0 auto 0.5rem;
`;

const message = css``;
