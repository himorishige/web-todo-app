/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TasksList from '.';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { useAppDispatch } from 'src/app/hooks';
import { useEffect } from 'react';
import { fetchAllTasks } from 'src/features/tasks/tasksSlice';
import { rest } from 'msw';
import { ApiResponseType, Task } from 'src/types';
import { API_URL } from 'src/constants';

const mockData: ApiResponseType<Task[]> = {
  status: 'ok',
  data: [
    {
      createdAt: '2021-07-10T08:52:01.696Z',
      priority: 0,
      id: 'bbeff447-6b94-402d-8961-7ab44e9f6fc7',
      description: '',
      updatedAt: '2021-07-10T08:52:01.696Z',
      title: '卵を買ってくる',
      isCompleted: false,
    },
    {
      updatedAt: '2021-07-10T07:31:51.095Z',
      createdAt: '2021-07-09T12:09:03.565Z',
      priority: 1,
      description: 'メグミルク',
      id: '5672a87d-5129-4987-a579-fde08a8c5d41',
      isCompleted: false,
      title: '牛乳を買ってくる',
    },
  ],
};

export default {
  title: 'WebToDoApp/Organisms/TasksList',
  component: TasksList,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} as ComponentMeta<typeof TasksList>;

const Template: ComponentStory<typeof TasksList> = (args) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);
  return <TasksList {...args} />;
};

export const Default = Template.bind({});
Default.storyName = 'Default';
Default.args = {};
Default.parameters = {
  msw: [
    rest.get(API_URL, (req, res, ctx) => {
      return res(ctx.json(mockData));
    }),
  ],
};

export const NoData = Template.bind({});
NoData.storyName = 'NoData';
NoData.args = {};
NoData.parameters = {
  msw: [
    rest.get(API_URL, (req, res, ctx) => {
      return res(ctx.json({ status: 'ok', data: [] }));
    }),
  ],
};

export const NetWorkError = Template.bind({});
NetWorkError.storyName = 'NetWorkError';
NetWorkError.parameters = {
  msw: [
    rest.get(API_URL, (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ error: 'error' }));
    }),
  ],
};
