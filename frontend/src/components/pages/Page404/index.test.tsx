import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { store } from 'src/app/store';
import { HelmetProvider } from 'react-helmet-async';
import Page404 from '.';

describe('pages/Page404', () => {
  test('正しくレンダリングされている', () => {
    const target = renderer
      .create(
        <Provider store={store}>
          <HelmetProvider>
            <BrowserRouter>
              <Page404 />
            </BrowserRouter>
          </HelmetProvider>
        </Provider>,
      )
      .toJSON();
    expect(target).toMatchSnapshot();
  });
});
