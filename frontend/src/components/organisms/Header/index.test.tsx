import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { store } from 'src/app/store';
import Header from '.';

describe('Organisms/Header', () => {
  test('正しくレンダリングされている', () => {
    const element = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(element).toMatchSnapshot();
  });
});
