import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from 'src/features/tasks/tasksSlice';
import { ToastProvider } from 'src/hooks/useToast';
import { HelmetProvider } from 'react-helmet-async';
import { Home } from 'src/components/pages';
import { matchers } from '@emotion/jest';
import { ApiResponseType, Task } from 'src/types';
import { API_URL } from 'src/constants';
import { act } from 'react-dom/test-utils';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

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

const singleMockData: ApiResponseType<Task> = {
  status: 'ok',
  data: {
    createdAt: '2021-07-10T08:52:01.696Z',
    priority: 0,
    id: 'bbeff447-6b94-402d-8961-7ab44e9f6fc0',
    description: '',
    updatedAt: '2021-07-10T08:52:01.696Z',
    title: 'メグミルクを買ってくる',
    isCompleted: false,
  },
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

  test('お気に入りタスクでフィルターした時にはお気に入りタスクだけが表示される', async () => {
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
    await act(async () => {
      userEvent.click(await screen.findByTestId('toggle-button'));
    });
    expect(await screen.findAllByTestId('task-item')).toHaveLength(1);
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

  test('タスクを追加する際にネットワークエラーの場合エラーメッセージが表示される', async () => {
    server.use(
      rest.get(API_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockData));
      }),
      rest.post(API_URL, (req, res, ctx) => {
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
    expect(await screen.findAllByTestId('task-item')).toHaveLength(2);
    expect(await screen.findByTestId('input-area')).toHaveValue('');
    await act(async () => {
      userEvent.type(await screen.findByTestId('input-area'), 'メグミルクを買ってくる');
      userEvent.click(await screen.findByText('登録'));
    });
    expect(await screen.findByTestId('tasks-net-error')).toBeTruthy();
  });

  test('タスクを追加すると一覧に登録されたタスクが1件増える', async () => {
    const sleep = (value: number) => new Promise((resolve) => setTimeout(resolve, value));
    server.use(
      rest.get(API_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockData));
      }),
      rest.post(API_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(singleMockData));
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
    expect(await screen.findAllByTestId('task-item')).toHaveLength(2);
    expect(await screen.findByTestId('input-area')).toHaveValue('');
    await act(async () => {
      userEvent.type(await screen.findByTestId('input-area'), 'メグミルクを買ってくる');
      userEvent.click(await screen.findByText('登録'));
    });
    await sleep(1000);
    expect(await screen.findByTestId('input-area')).toHaveValue('');
    expect(await screen.findAllByTestId('task-item')).toHaveLength(3);
  });

  test('タスクのお気に入りボタンを押下すると色が変わる', async () => {
    server.use(
      rest.get(API_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockData));
      }),
      rest.patch(API_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(singleMockData));
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
    expect(await screen.findAllByTestId('task-item')).toHaveLength(2);
    expect(await screen.findByTestId('input-area')).toHaveValue('');
    const target = await screen.findAllByTestId('star');
    expect(target[0]).toHaveStyleRule('color', 'var(--primary-color)');
    await act(async () => {
      userEvent.click(target[0]);
    });
    expect(target[0]).toHaveStyleRule('color', 'var(--primary-color)');
    await act(async () => {
      userEvent.click(target[0]);
    });
    expect(target[0]).toHaveStyleRule('color', 'var(--primary-color)');
  });

  test('タスクのチェックボタンをクリックするとチェックに切り替わる', async () => {
    server.use(
      rest.get(API_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockData));
      }),
      rest.patch(API_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(singleMockData));
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
    expect(await screen.findAllByTestId('task-item')).toHaveLength(2);
    const target = await screen.findAllByTestId('checkbutton');
    expect(target[0]).toHaveStyle('background: rgb(216, 179, 132, 0.5)');
    await act(async () => {
      userEvent.click(target[0]);
    });
    expect(target[0]).toHaveStyle('background: var(--primary-color)');
    await act(async () => {
      userEvent.click(target[0]);
    });
    expect(target[0]).toHaveStyle('background: rgb(216, 179, 132, 0.5)');
  });
});
