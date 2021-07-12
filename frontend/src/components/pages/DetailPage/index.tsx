/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextArea, TrashIcon } from 'src/components/atoms';
import { TaskItem } from 'src/components/molecules';
import { Layout } from 'src/components/templates';
import { selectStatus, selectTasks, updateTask } from 'src/features/tasks/tasksSlice';

import { format } from 'date-fns';

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

const DetailPage: React.VFC<Props> = (props) => {
  const taskId = props.match.params.id;
  const status = useAppSelector(selectStatus);
  const task = useAppSelector((state) => selectTasks.selectById(state, taskId));
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  const deleteHandler = () => {
    console.log('delete');
  };

  const updateHandler = () => {
    console.log('update');
  };

  return (
    <Layout>
      <div css={wrapperStyle}>
        {task ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TaskItem
              id={task.id}
              title={task.title}
              isCompleted={task.isCompleted}
              priority={task.priority}
              completedStateHandler={completedStateHandler}
              priorityStateHandler={priorityStateHandler}
            />
            <div css={textAreaWrapper}>
              <TextArea label="taskMemo" placeholder="メモ" register={register} />
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
                <Button label="メモを更新" onClick={updateHandler} disabled={!watch('taskMemo')} />
              </div>
            </div>
          </form>
        ) : (
          <div>タスクが見つかりませんでした</div>
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
