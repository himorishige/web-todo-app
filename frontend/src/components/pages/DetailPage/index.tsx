/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Input, TextArea, TrashIcon } from 'src/components/atoms';
import { Message } from 'src/components/molecules';
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

type Props = {
  match: {
    params: {
      id: string;
    };
  };
};

type Inputs = {
  taskName: string;
  taskMemo: string;
};

const DetailPage: React.VFC<Props> = (props) => {
  const taskId = props.match?.params?.id || '404';
  const status = useAppSelector(selectStatus);
  const task = useAppSelector((state) => selectTasks.selectById(state, taskId));
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const history = useHistory();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      const result = await dispatch(
        updateTask({
          id: taskId,
          title: data.taskName,
          description: data.taskMemo,
        }),
      );

      if (updateTask.fulfilled.match(result)) {
        showToast('SUCCESS', 'タスクを更新しました');
      }

      if (updateTask.rejected.match(result)) {
        showToast('FAIL', 'タスクの更新に失敗しました');
      }
    },
    [dispatch, showToast, taskId],
  );

  const deleteHandler = useCallback(async () => {
    if (window.confirm('タスクを削除してもよいですか？')) {
      await dispatch(removeTask(taskId));

      showToast('SUCCESS', 'タスクを削除しました');
      history.push('/');
    }
  }, [dispatch, history, showToast, taskId]);

  // 直接詳細ページに訪れた場合、リロードした場合の処理
  useEffect(() => {
    if (!task) {
      const fetch = async () => {
        const result = await dispatch(fetchAllTasks());

        if (fetchAllTasks.rejected.match(result)) {
          showToast('FAIL', 'タスクの取得に失敗しました');
        }
      };
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout pageTitle={`${task?.title}`}>
      <div css={wrapperStyle}>
        {task ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                label="taskName"
                placeholder="タスクを入力してください"
                defaultValue={task.title}
                register={register}
                required
                disabled={status === 'loading'}
              />
            </div>
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
              <div onClick={deleteHandler} data-testid="tasks-delete">
                <TrashIcon />
              </div>
              <div>
                <Button primary label="タスクを更新" disabled={status === 'loading'} />
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
};

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
