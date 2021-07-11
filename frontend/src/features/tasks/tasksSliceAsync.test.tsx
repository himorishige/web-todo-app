import { render, screen, cleanup } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

import { Home } from 'src/components/pages';
import { ApiResponseType, Task } from 'src/types';
import { BrowserRouter } from 'react-router-dom';

// APIエンドポイント
const URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const mockData: ApiResponseType<Task[]> = {
  status: 'ok',
  data: [
    {
      createdAt: '2021-07-10T08:52:01.696Z',
      priority: 0,
      id: 'bbeff447-6b94-402d-8961-7ab44e9f6fc7',
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

const server = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('AsyncAPI Mock', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        tasks: tasksReducer,
      },
    });
  });
  test('FetchAll', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.queryAllByTestId('tasks-item')).toHaveLength(0);
    expect(await screen.findAllByTestId('task-item')).toHaveLength(2);
  });
  test('FetchAll Network Failed', async () => {
    server.use(
      rest.get(URL, (req, res, ctx) => {
        return res(ctx.status(404));
      }),
    );
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.queryAllByTestId('tasks-item')).toHaveLength(0);
    expect(await screen.findByTestId('tasks-net-error')).toBeTruthy();
  });
});
