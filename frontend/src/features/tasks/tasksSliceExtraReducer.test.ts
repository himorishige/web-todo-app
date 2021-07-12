import { createEntityAdapter } from '@reduxjs/toolkit';
import { ApiResponseType, Task } from 'src/types';
import tasksReducer, { createTask, fetchAllTasks, removeTask, updateTask } from './tasksSlice';

describe('tasksSlice/ExtraReducer', () => {
  const mockData: ApiResponseType<Task[]> = {
    status: 'ok',
    data: [
      {
        createdAt: '2021-07-10T08:52:01.696Z',
        priority: 0,
        id: 'bbeff447-6b94-402d-8961-7ab44e9f6fc7',
        updatedAt: '2021-07-10T08:52:01.696Z',
        title: '卵を買ってくる',
        description: '',
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
      description: '',
      id: 'bbeff447-6b94-402d-8961-7ab44e9f6fc7',
      updatedAt: '2021-07-10T08:52:01.696Z',
      title: 'テスト卵を買ってくる',
      isCompleted: true,
    },
  };

  const tasksAdapter = createEntityAdapter<Task>({
    selectId: (task) => task.id,
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
  });

  const initialState = tasksAdapter.getInitialState({
    status: 'idle',
    message: '',
  });

  test('初期値が正しく反映されている', () => {
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual({
      entities: {},
      ids: [],
      status: 'idle',
      message: '',
    });
  });

  describe('tasksSlice/createTask', () => {
    test('取得開始時にはローディング中になり、エラーメッセージがクリアされる', async () => {
      const action = { type: createTask.pending.type };
      const state = tasksReducer(initialState, action);
      expect(state.status).toEqual('loading');
      expect(state.message).toBeFalsy();
    });
    test('取得成功時、取得したデータが入っている', async () => {
      const action = { type: createTask.fulfilled.type, payload: singleMockData };
      const state = tasksReducer(initialState, action);
      const title = tasksAdapter.getSelectors().selectById(state, singleMockData.data.id)?.title;
      expect(state.status).toEqual('idle');
      expect(state.ids).toHaveLength(1);
      expect(title).toBe('テスト卵を買ってくる');
    });
    test('取得失敗時にはローディングが終了し、エラーメッセージが格納される', async () => {
      const action = {
        type: createTask.rejected.type,
        error: { message: 'error' },
      };
      const state = tasksReducer(initialState, action);
      expect(state.status).toEqual('failed');
      expect(state.message).toBe('error');
    });
  });

  describe('tasksSlice/fetchAllTasks', () => {
    test('取得開始時にはローディング中になり、エラーメッセージがクリアされる', async () => {
      const action = { type: fetchAllTasks.pending.type };
      const state = tasksReducer(initialState, action);
      expect(state.status).toEqual('loading');
      expect(state.message).toBeFalsy();
    });

    test('取得成功時、取得したデータが正しい件数入っている', async () => {
      const action = { type: fetchAllTasks.fulfilled.type, payload: mockData };
      const state = tasksReducer(initialState, action);
      const target = tasksAdapter.getSelectors().selectById(state, mockData.data[0].id)?.id;
      expect(state.status).toEqual('idle');
      expect(state.ids).toHaveLength(2);
      expect(target).toBe('bbeff447-6b94-402d-8961-7ab44e9f6fc7');
    });

    test('取得失敗時にはローディングが終了し、エラーメッセージが格納される', async () => {
      const action = {
        type: fetchAllTasks.rejected.type,
        error: { message: 'error' },
      };
      const state = tasksReducer(initialState, action);
      expect(state.status).toEqual('failed');
      expect(state.message).toBe('error');
    });
  });

  describe('tasksSlice/updateTask', () => {
    let action: any;
    let state: any;

    beforeEach(() => {
      action = { type: fetchAllTasks.fulfilled.type, payload: mockData };
      state = tasksReducer(initialState, action);
    });

    test('開始時にはローディング中になり、エラーメッセージがクリアされる', async () => {
      action = { type: updateTask.pending.type };
      state = tasksReducer(state, action);
      expect(state.status).toEqual('loading');
      expect(state.message).toBeFalsy();
    });

    test('更新成功時、更新したデータが正しく更新されている', async () => {
      const updateData: ApiResponseType<Task> = {
        status: 'ok',
        data: {
          createdAt: '2021-07-10T08:52:01.696Z',
          priority: 0,
          id: 'bbeff447-6b94-402d-8961-7ab44e9f6fc7',
          updatedAt: '2021-07-10T08:52:01.696Z',
          title: '卵を買ってくる',
          isCompleted: true,
        },
      };
      action = { type: updateTask.fulfilled.type, payload: updateData };
      state = tasksReducer(state, action);
      const target = tasksAdapter.getSelectors().selectById(state, updateData.data.id)?.isCompleted;
      expect(state.status).toEqual('idle');
      expect(target).toBeTruthy();
    });

    test('取得失敗時にはローディングが終了し、エラーメッセージが格納される', async () => {
      const action = {
        type: updateTask.rejected.type,
        error: { message: 'error' },
      };
      const state = tasksReducer(initialState, action);
      expect(state.status).toEqual('failed');
      expect(state.message).toBe('error');
    });
  });

  describe('tasksSlice/removeTask', () => {
    let action: any;
    let state: any;

    beforeEach(() => {
      action = { type: fetchAllTasks.fulfilled.type, payload: mockData };
      state = tasksReducer(initialState, action);
    });

    test('開始時にはローディング中になり、エラーメッセージがクリアされる', async () => {
      action = { type: removeTask.pending.type };
      state = tasksReducer(state, action);
      expect(state.status).toEqual('loading');
      expect(state.message).toBeFalsy();
    });

    test('削除成功時、更新したデータが削除されている', async () => {
      const removeData: ApiResponseType<string> = {
        status: 'ok',
        data: 'bbeff447-6b94-402d-8961-7ab44e9f6fc7',
      };
      action = { type: removeTask.fulfilled.type, payload: removeData };
      state = tasksReducer(state, action);
      const target = tasksAdapter.getSelectors().selectById(state, removeData.data)?.id;
      expect(state.status).toEqual('idle');
      expect(state.ids).toHaveLength(1);
      expect(target).toBeUndefined();
    });

    test('取得失敗時にはローディングが終了し、エラーメッセージが格納される', async () => {
      const action = {
        type: removeTask.rejected.type,
        error: { message: 'error' },
      };
      const state = tasksReducer(initialState, action);
      expect(state.status).toEqual('failed');
      expect(state.message).toBe('error');
    });
  });
});
