/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Home from '.';
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
  title: 'WebToDoApp/Pages/Home',
  component: Home,
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Default';
Default.parameters = {
  msw: [
    rest.get(API_URL, (req, res, ctx) => {
      return res(ctx.json(mockData));
    }),
  ],
};

export const NoData = Template.bind({});
NoData.storyName = 'No Data';
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
