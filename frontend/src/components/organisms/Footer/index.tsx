/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Input } from 'src/components/atoms';
import { useToast } from 'src/hooks/useToast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { createTask, selectStatus } from 'src/features/tasks/tasksSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { memo } from 'react';
import { useCallback } from 'react';

type Props = {};

type Inputs = {
  taskName: string;
  taskMemo: string;
};

const Footer: React.VFC<Props> = memo(() => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, watch, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
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
        if (location.pathname !== '/') {
          navigate('/');
        }
      }
      if (createTask.rejected.match(result)) {
        const message = result.error.message;
        showToast('FAIL', `タスクの登録に失敗しました ${message}`);
      }
    },
    [dispatch, navigate, location.pathname, reset, showToast],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div css={footerStyle}>
        <div css={innerStyle}>
          <div css={inputWrapper}>
            <Input
              label="taskName"
              placeholder="新しいタスクを入力してください"
              register={register}
              required
              disabled={status === 'loading'}
            />
          </div>
          <div css={buttonWrapper}>
            <Button
              primary
              label="登録"
              disabled={!watch('taskName') || status === 'loading'}
            />
          </div>
        </div>
      </div>
    </form>
  );
});

export default Footer;

const footerStyle = css`
  background: var(--tertiary-color);
  width: 100%;
`;

const innerStyle = css`
  max-width: 768px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.25rem;
  margin: 0 auto;
`;

const inputWrapper = css`
  width: 100%;
`;

const buttonWrapper = css`
  padding-left: 1rem;
`;
