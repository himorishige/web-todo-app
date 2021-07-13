/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextArea, TrashIcon } from 'src/components/atoms';
import { Message, TaskItem } from 'src/components/molecules';
import { Layout } from 'src/components/templates';
import {
  fetchAllTasks,
  removeTask,
  selectStatus,
  selectTasks,
  updateTask,
} from 'src/features/tasks/tasksSlice';
import { useToast } from 'src/hooks/useToast';
import { format } from 'date-fns';
import { useCallback, useEffect } from 'react';
import { memo } from 'react';

type Props = RouteComponentProps & {
  match: {
    params: {
      id: string;
    };
  };
};

type Inputs = {
  taskMemo: string;
};

const DetailPage: React.VFC<Props> = memo((props) => {
  const taskId = props.match.params.id;
  const status = useAppSelector(selectStatus);
  const task = useAppSelector((state) => selectTasks.selectById(state, taskId));
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const history = useHistory();

  const { register, handleSubmit, watch } = useForm<Inputs>();

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

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      const result = await dispatch(
        updateTask({
          id: taskId,
          description: data.taskMemo,
        }),
      );

      if (updateTask.fulfilled.match(result)) {
        showToast('SUCCESS', 'メモを更新しました');
      }

      if (updateTask.rejected.match(result)) {
        showToast('FAIL', 'メモの更新に失敗しました');
      }
    },
    [dispatch, showToast, taskId],
  );

  const confirmPromise = useCallback((message: string) => {
    if (window.confirm(message)) {
      return Promise.resolve();
    }
    return Promise.reject();
  }, []);

  const deleteHandler = useCallback(async () => {
    confirmPromise('タスクを削除してもよいですか？').then(async () => {
      await dispatch(removeTask(taskId));

      showToast('SUCCESS', 'タスクを削除しました');
      history.push('/');
    });
  }, [confirmPromise, dispatch, history, showToast, taskId]);

  useEffect(() => {
    if (!task) {
      dispatch(fetchAllTasks());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div css={wrapperStyle}>
        {task ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TaskItem
              id={task.id}
              title={task.title}
              description={task.description}
              isCompleted={task.isCompleted}
              priority={task.priority}
              completedStateHandler={completedStateHandler}
              priorityStateHandler={priorityStateHandler}
            />
            <div css={textAreaWrapper}>
              <TextArea
                label="taskMemo"
                placeholder="メモ"
                register={register}
                defaultValue={task.description}
              />
            </div>
            <div css={timeWrapper}>
              <div>登録：{format(new Date(task.createdAt), 'yyyy/MM/dd HH:mm')}</div>
              <div>更新：{format(new Date(task.updatedAt), 'yyyy/MM/dd HH:mm')}</div>
            </div>
            <div css={controlWrapper}>
              <div onClick={deleteHandler}>
                <TrashIcon />
              </div>
              <div>
                <Button primary label="メモを更新" disabled={status === 'loading'} />
              </div>
            </div>
          </form>
        ) : (
          <div css={message} data-testid="tasks-error">
            <Message>該当するIDのタスクはありません</Message>
          </div>
        )}
      </div>
    </Layout>
  );
});

export default DetailPage;

const wrapperStyle = css`
  padding: 1.25rem;
`;

const textAreaWrapper = css`
  margin-top: 1.25rem;
`;

const timeWrapper = css`
  display: flex;
  justify-content: flex-end;
  div {
    font-size: 0.75rem;
    margin-left: 1.25rem;
  }
`;

const controlWrapper = css`
  width: 100%;
  margin-top: 1.25rem;
  padding-left: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const message = css``;
