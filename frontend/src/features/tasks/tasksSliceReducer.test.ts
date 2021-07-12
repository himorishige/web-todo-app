import tasksReducer from './tasksSlice';

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
