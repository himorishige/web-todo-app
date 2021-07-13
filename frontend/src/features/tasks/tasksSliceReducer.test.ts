import tasksReducer, { toggleFilter } from './tasksSlice';

describe('tasksSlice/Reducer', () => {
  test('初期値が正しく反映されている', () => {
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual({
      entities: {},
      ids: [],
      status: 'idle',
      message: '',
      filter: false,
    });
  });
});

describe('tasksSlice/toggleFilter', () => {
  test('フィルターのトグルが機能する', () => {
    let initialState = {
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
