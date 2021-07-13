/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DetailPage from '.';
import { rest } from 'msw';
import { ApiResponseType, Task } from 'src/types';

const URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

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
  title: 'WebToDoApp/Pages/DetailPage',
  component: DetailPage,
} as ComponentMeta<typeof DetailPage>;

const Template: ComponentStory<typeof DetailPage> = (args) => <DetailPage {...args} />;

export const Default = Template.bind({});
Default.storyName = 'DetailPage';
Default.args = {
  match: {
    params: {
      id: '5672a87d-5129-4987-a579-fde08a8c5d41',
    },
  },
};
Default.parameters = {
  msw: [
    rest.get(URL, (req, res, ctx) => {
      return res(ctx.json(mockData));
    }),
  ],
};

export const NoData = Template.bind({});
NoData.storyName = 'No Data';
NoData.args = {
  match: {
    params: {
      id: '1',
    },
  },
};

export const NetWorkError = Template.bind({});
NetWorkError.storyName = 'NetWorkError';
NetWorkError.args = {
  match: {
    params: {
      id: '5672a87d-5129-4987-a579-fde08a8c5d41',
    },
  },
};
NetWorkError.parameters = {
  msw: [
    rest.get(URL, (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ error: 'error' }));
    }),
  ],
};