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

const TasksList: React.VFC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const starState = useAppSelector(selectStarStatus);
  const errorMessage = useAppSelector(selectErrorMessage);
  const tasks = useAppSelector(selectTasks.selectAll);
  const { showToast } = useToast();

  // 完了フラグの管理
  const completedStateHandler = async (id: string, isCompleted: boolean) => {
    const result = await dispatch(
      updateTask({
        id: id,
        isCompleted: isCompleted,
      }),
    );

    if (updateTask.rejected.match(result)) {
      showToast('FAIL', '完了フラグの更新に失敗しました');
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

    if (updateTask.rejected.match(result)) {
      showToast('FAIL', '優先度の更新に失敗しました');
    }
  };

  if (status === 'failed') {
    return (
      <div data-testid="tasks-area">
        <div css={message} data-testid="tasks-net-error">
          <Message>{errorMessage}</Message>
        </div>
      </div>
    );
  }

  if (tasks.length && starState) {
    return (
      <div data-testid="tasks-area">
        {tasks.filter((task) => task.priority === 1).length ? (
          tasks
            .filter((task) => task.priority === 1)
            .map((task) => (
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
          <div data-testid="tasks-area">
            <div css={message} data-testid="tasks-error">
              <Message>登録されているお気に入りタスクはありません</Message>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (tasks.length && !starState) {
    return (
      <div data-testid="tasks-area">
        {tasks.map((task) => (
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
        ))}
      </div>
    );
  }

  return (
    <div data-testid="tasks-area">
      <div css={message} data-testid="tasks-error">
        <Message>登録されているタスクはありません</Message>
      </div>
    </div>
  );
};

export default TasksList;

const taskItemStyle = css`
  margin: 0 auto 0.5rem;
`;

const message = css`
  margin: 1.25rem;
`;
