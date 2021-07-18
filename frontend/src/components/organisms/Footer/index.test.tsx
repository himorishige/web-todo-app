import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { store } from 'src/app/store';
import Footer from '.';

describe('Organisms/Footer', () => {
  test('正しくレンダリングされている', () => {
    const element = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Footer />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(element).toMatchSnapshot();
  });
});
