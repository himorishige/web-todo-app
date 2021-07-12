/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Input } from 'src/components/atoms';
import { useToast } from 'src/hooks/useToast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from 'src/app/hooks';
import { createTask } from 'src/features/tasks/tasksSlice';

type Props = {};

type Inputs = {
  taskName: string;
};

const Footer: React.VFC<Props> = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // タスクの登録
    const result = await dispatch(
      createTask({
        title: data.taskName,
        description: '',
        priority: 0,
        isCompleted: false,
      }),
    );

    if (createTask.fulfilled.match(result)) {
      showToast('SUCCESS', 'タスクを登録しました');
      reset();
    }
    if (createTask.rejected.match(result)) {
      const message = result.error.message;
      showToast('FAIL', `タスクの登録に失敗しました ${message}`);
    }
    console.log('form-error', errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div css={footerStyle}>
        <div css={inputWrapper}>
          <Input
            label="taskName"
            placeholder="タスクを入力してください"
            register={register}
            required
          />
        </div>
        <div css={buttonWrapper}>
          <Button primary label="登録" disabled={!watch('taskName')} />
        </div>
      </div>
    </form>
  );
};

export default Footer;

const footerStyle = css`
  background: var(--tertiary-color);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.25rem;
`;

const inputWrapper = css`
  width: 100%;
`;

const buttonWrapper = css`
  padding-left: 1rem;
`;
