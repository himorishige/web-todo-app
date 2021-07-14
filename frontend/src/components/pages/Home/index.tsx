/** @jsxImportSource @emotion/react */
import React, { memo, useEffect } from 'react';
import { css } from '@emotion/react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { Spinner } from 'src/components/atoms';
import { TasksList } from 'src/components/organisms';
import { Layout } from 'src/components/templates';
import { fetchAllTasks, selectStatus } from 'src/features/tasks/tasksSlice';

const Home: React.VFC = memo(() => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    const init = async () => {
      const result = await dispatch(fetchAllTasks());

      if (fetchAllTasks.fulfilled.match(result)) {
        // console.log('useEffect Updated');
      }

      if (fetchAllTasks.rejected.match(result)) {
        // console.log('useEffect not updated');
      }
    };
    init();
  }, [dispatch]);

  return (
    <Layout pageTitle="タスク一覧">
      <div css={wrapperStyle}>
        {status === 'loading' ? (
          <div css={loadingStyle}>
            <Spinner />
          </div>
        ) : (
          <TasksList />
        )}
      </div>
    </Layout>
  );
});

export default Home;

const wrapperStyle = css`
  padding: 1.25rem;
`;

const loadingStyle = css`
  width: 100%;
  height: calc(100vh - 96px - 118px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
