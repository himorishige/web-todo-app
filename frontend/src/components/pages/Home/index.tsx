import React, { useEffect } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { TasksList } from 'src/components/organisms';
import { Layout } from 'src/components/templates';
import { fetchAllTasks } from 'src/features/tasks/tasksSlice';

const Home: React.VFC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  return (
    <Layout>
      <TasksList />
    </Layout>
  );
};

export default Home;
