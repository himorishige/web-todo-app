import renderer from 'react-test-renderer';
import TaskList from '.';
import { matchers } from '@emotion/jest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

describe('Organisms/TaskList', () => {
  test('正しくレンダリングされている', () => {
    const element = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <TaskList />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(element).toMatchSnapshot();
  });
});
