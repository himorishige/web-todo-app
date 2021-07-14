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
import { useToast } from 'src/hooks/useToast';
import { useCallback, useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import { Task } from 'src/types';

const TasksList: React.VFC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const starState = useAppSelector(selectStarStatus);
  const errorMessage = useAppSelector(selectErrorMessage);
  const tasks = useAppSelector(selectTasks.selectAll);
  const { showToast } = useToast();
  const [sortData, setSortData] = useState<Task[]>([]);

  // 未完了のタスクを優先し、作成日が古いもの順で並び替える
  const sortFunction = useCallback(() => {
    const sortData = sortBy(tasks, ['isCompleted', 'createdAt']);
    setSortData(sortData);
  }, [tasks]);

  useEffect(() => {
    sortFunction();
  }, [sortFunction, tasks]);

  // 完了フラグの管理
  const completedStateHandler = useCallback(
    async (id: string, isCompleted: boolean) => {
      const result = await dispatch(
        updateTask({
          id: id,
          isCompleted: isCompleted,
        }),
      );

      if (updateTask.rejected.match(result)) {
        showToast('FAIL', '完了フラグの更新に失敗しました');
      }
    },
    [dispatch, showToast],
  );

  // 優先度フラグの管理
  const priorityStateHandler = useCallback(
    async (id: string, priority: number) => {
      const result = await dispatch(
        updateTask({
          id: id,
          priority: priority,
        }),
      );

      if (updateTask.rejected.match(result)) {
        showToast('FAIL', '優先度の更新に失敗しました');
      }
    },
    [dispatch, showToast],
  );

  if (status === 'failed') {
    return (
      <div data-testid="tasks-area">
        <div css={message} data-testid="tasks-net-error">
          <Message>{errorMessage}</Message>
        </div>
      </div>
    );
  }

  return (
    <>
      {tasks && starState ? (
        <div data-testid="tasks-area">
          {sortData.filter((task) => task.priority === 1).length ? (
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
        <div data-testid="tasks-area">
          {sortData.map((task) => (
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
