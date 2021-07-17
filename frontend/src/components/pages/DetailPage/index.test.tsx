import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'src/app/store';
import { HelmetProvider } from 'react-helmet-async';
import DetailPage from '.';
import { rest } from 'msw';
import { API_URL } from 'src/constants';
import { ApiResponseType, Task } from 'src/types';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
declare const global: any;
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

const sleep = (value: number) => new Promise((resolve) => setTimeout(resolve, value));

// beforeEach(() => {
//   global.window = {};
// });
// const mockCallWindow = jest.fn(() => true);
// window.confirm = mockCallWindow;
// jest.spyOn(global, 'confirm' as any).mockReturnValueOnce(true);

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const server = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),
);
let confirmSpy: any;
beforeAll(() => {
  confirmSpy = jest.spyOn(window, 'confirm');
  confirmSpy.mockImplementation(jest.fn(() => true));
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
  confirmSpy.mockRestore();
});

describe('pages/DetailPage', () => {
  test('正しくレンダリングされている', () => {
    const props = {
      params: {
        id: '5672a87d-5129-4987-a579-fde08a8c5d41',
      },
    };
    const target = render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <DetailPage match={props} />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );
    expect(target).toMatchSnapshot();
  });

  test('URLパラメータで渡されたIDのタスクが表示される', async () => {
    const props = {
      params: {
        id: '5672a87d-5129-4987-a579-fde08a8c5d41',
      },
    };
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <DetailPage match={props} />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );
    expect(screen.queryAllByTestId('tasks-item')).toHaveLength(0);
    expect(await screen.findByTestId('tasks-textarea')).toHaveValue('メグミルク');
  });

  test('URLパラメータで渡されたIDがない場合にエラーが表示される', async () => {
    const props = {
      params: {
        id: 'dummy',
      },
    };
    server.use(
      rest.get(API_URL, (req, res, ctx) => {
        return res(ctx.status(404));
      }),
    );
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <DetailPage match={props} />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );
    expect(screen.queryAllByTestId('tasks-item')).toHaveLength(0);
    expect(await screen.findByText('該当するIDのタスクはありません')).toBeInTheDocument();
  });

  test('API拒否時にエラーが表示される', async () => {
    const props = {
      params: {
        id: 'dummy',
      },
    };
    server.use(
      rest.get(API_URL, (req, res, ctx) => {
        return res(ctx.status(403));
      }),
    );
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <DetailPage match={props} />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );
    expect(screen.queryAllByTestId('tasks-item')).toHaveLength(0);
    expect(await screen.findByText('該当するIDのタスクはありません')).toBeInTheDocument();
  });

  test('タスクを更新ボタンで更新ができる', async () => {
    const props = {
      params: {
        id: 'bbeff447-6b94-402d-8961-7ab44e9f6fc7',
      },
    };
    server.use(
      rest.patch(`${API_URL}/${props.params.id}`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            status: 'ok',
            data: {
              createdAt: '2021-07-10T08:52:01.696Z',
              priority: 0,
              id: 'bbeff447-6b94-402d-8961-7ab44e9f6fc7',
              description: '',
              updatedAt: '2021-07-10T08:52:01.696Z',
              title: '卵を買ってくる',
              isCompleted: false,
            },
          }),
        );
      }),
      rest.options(`${API_URL}/${props.params.id}`, (req, res, ctx) => {
        return res(ctx.status(200));
      }),
    );
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <DetailPage match={props} />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );

    expect(await screen.findByTestId('tasks-textarea')).toHaveValue('');
    await act(async () => {
      userEvent.type(await screen.findByTestId('tasks-textarea'), 'メグミルク');
      userEvent.click(await screen.findByText('タスクを更新'));
    });
    expect(await screen.findByTestId('tasks-textarea')).toHaveValue('メグミルク');
  });

  test('タスクを更新ボタンでエラーの場合', async () => {
    const props = {
      params: {
        id: 'bbeff447-6b94-402d-8961-7ab44e9f6fc7',
      },
    };
    server.use(
      rest.patch(`${API_URL}/${props.params.id}`, (req, res, ctx) => {
        return res(ctx.status(403));
      }),
    );
    server.use(
      rest.options(`${API_URL}/${props.params.id}`, (req, res, ctx) => {
        return res(ctx.status(403));
      }),
    );
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <DetailPage match={props} />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );

    expect(await screen.findByTestId('tasks-textarea')).toHaveValue('');
    await act(async () => {
      userEvent.type(await screen.findByTestId('tasks-textarea'), 'メグミルク');
      userEvent.click(await screen.findByText('タスクを更新'));
    });
    expect(await screen.findByTestId('tasks-textarea')).toHaveValue('メグミルク');
  });

  test('タスクを削除ボタンで削除ができる', async () => {
    const props = {
      params: {
        id: 'bbeff447-6b94-402d-8961-7ab44e9f6fc7',
      },
    };
    server.use(
      rest.delete(`${API_URL}/${props.params.id}`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            status: 'ok',
            data: 'Successfully removed.',
          }),
        );
      }),
    );

    render(
      <Provider store={store}>
        <HelmetProvider>
          <MemoryRouter>
            <DetailPage match={props} />
          </MemoryRouter>
        </HelmetProvider>
      </Provider>,
    );

    window.confirm = jest.fn().mockImplementation(() => true);
    await act(async () => {
      userEvent.click(await screen.findByTestId('tasks-delete'));
    });
    expect(window.confirm).toHaveBeenCalledWith('タスクを削除してもよいですか？');
    await sleep(1000);
    expect(mockHistoryPush).toHaveBeenCalled();
  });

  test('タスクを削除ボタンでネットワークエラーの場合', async () => {
    const props = {
      params: {
        id: 'bbeff447-6b94-402d-8961-7ab44e9f6fc7',
      },
    };
    server.use(
      rest.delete(`${API_URL}/${props.params.id}`, (req, res, ctx) => {
        return res(ctx.status(403));
      }),
    );

    render(
      <Provider store={store}>
        <HelmetProvider>
          <MemoryRouter>
            <DetailPage match={props} />
          </MemoryRouter>
        </HelmetProvider>
      </Provider>,
    );

    window.confirm = jest.fn().mockImplementation(() => true);
    await act(async () => {
      userEvent.click(await screen.findByTestId('tasks-delete'));
    });
    expect(window.confirm).toHaveBeenCalledWith('タスクを削除してもよいですか？');
    await sleep(1000);
    expect(mockHistoryPush).not.toHaveBeenCalled();
  });
});
