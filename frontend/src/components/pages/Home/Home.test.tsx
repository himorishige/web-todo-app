import { render, screen, cleanup } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../../../features/tasks/tasksSlice';
import { HelmetProvider } from 'react-helmet-async';
import { Home } from 'src/components/pages';
import { ApiResponseType, Task } from 'src/types';
import { BrowserRouter } from 'react-router-dom';
import { API_URL } from 'src/constants';
import { ToastProvider } from 'src/hooks/useToast';
import userEvent from '@testing-library/user-event';

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

const server = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('HomePage', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        tasks: tasksReducer,
      },
    });
  });
  test('正しくレンダリングされている', () => {
    const target = render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );
    expect(target).toMatchSnapshot();
  });
  test('APIから出力されたタスクが2件表示される', async () => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );
    expect(screen.queryAllByTestId('tasks-item')).toHaveLength(0);
    expect(await screen.findAllByTestId('task-item')).toHaveLength(2);
  });

  test('タスクは上から作成日順に並んでいる', async () => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );
    expect(screen.queryAllByTestId('tasks-item')).toHaveLength(0);
    expect(await screen.findAllByTestId('task-item')).toHaveLength(2);
    const target = await screen.findAllByTestId('task-item');
    expect(target[0]).toHaveTextContent('牛乳を買ってくる');
  });

  test('お気に入りタスクにフィルターした時に正しくフィルターされたタスクが表示される', async () => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );
    expect(screen.queryAllByTestId('tasks-item')).toHaveLength(0);
    expect(await screen.findAllByTestId('task-item')).toHaveLength(2);
    userEvent.click(await screen.findByTestId('toggle-button'));
    expect(await screen.findAllByTestId('task-item')).toHaveLength(1);
  });

  test('完了フラグをつけた時に順番が入れ替わる', async () => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );
    expect(screen.queryAllByTestId('tasks-item')).toHaveLength(0);
    expect(await screen.findAllByTestId('task-item')).toHaveLength(2);
    const target = await screen.findAllByTestId('task-item');
    expect(target[0]).toHaveTextContent('牛乳を買ってくる');
    const check = await screen.findAllByTestId('checkbutton');
    userEvent.click(check[0]);
    const nextTarget = await screen.findAllByTestId('task-item');
    expect(nextTarget[0]).toHaveTextContent('牛乳を買ってくる');
  });

  test('ネットワークエラーの時にエラーメッセージが表示される', async () => {
    server.use(
      rest.get(API_URL, (req, res, ctx) => {
        return res(ctx.status(404));
      }),
    );
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );
    expect(screen.queryAllByTestId('tasks-item')).toHaveLength(0);
    expect(await screen.findByTestId('tasks-net-error')).toBeTruthy();
  });
  test('API拒否時にエラーが表示される', async () => {
    server.use(
      rest.get(API_URL, (req, res, ctx) => {
        return res(
          ctx.status(403),
          ctx.json({
            error: 'error',
          }),
        );
      }),
    );
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <ToastProvider>
              <Home />
            </ToastProvider>
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );
    expect(screen.queryAllByTestId('tasks-item')).toHaveLength(0);
    expect(await screen.findByTestId('tasks-net-error')).toBeTruthy();
  });
});
