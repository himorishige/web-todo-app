/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { Spinner } from 'src/components/atoms';
import { TasksList } from 'src/components/organisms';
import { Layout } from 'src/components/templates';
import { fetchAllTasks, selectTasks } from 'src/features/tasks/tasksSlice';

const Home: React.VFC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks.selectAll);

  useEffect(() => {
    const init = async () => {
      const result = await dispatch(fetchAllTasks());

      if (fetchAllTasks.fulfilled.match(result)) {
        console.log('useEffect Updated');
      }

      if (fetchAllTasks.rejected.match(result)) {
        console.log('useEffect not updated');
      }
    };
    if (!tasks.length) {
      init();
    }
  }, [dispatch, tasks]);

  return (
    <Layout>
      <div css={wrapperStyle}>
        {tasks.length ? (
          <TasksList />
        ) : (
          <div css={loadingStyle}>
            <Spinner />
          </div>
        )}
      </div>
    </Layout>
  );
};

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
