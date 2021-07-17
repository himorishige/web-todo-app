import tasksReducer, { TasksState, toggleFilter } from './tasksSlice';

describe('tasksSlice/Reducer', () => {
  test('Storeの初期値が正しく反映されている', async () => {
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual({
      entities: {
        entities: {},
        ids: [],
      },
      ids: [],
      status: 'idle',
      message: '',
      filter: false,
    });
  });
});

describe('tasksSlice/toggleFilter', () => {
  test('お気に入りタスクフィルターのトグルアクションでtrue/falseが切り替わる', () => {
    let initialState: TasksState = {
      entities: {},
      ids: [],
      status: 'idle',
      message: '',
      filter: false,
    };
    const action = { type: toggleFilter.type };
    const state = tasksReducer(initialState, action);
    expect(state.filter).toBe(true);
    const nextState = tasksReducer(state, action);
    expect(nextState.filter).toBe(false);
  });
});
