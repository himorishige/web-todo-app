import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'src/app/store';
import { HelmetProvider } from 'react-helmet-async';
import Page404 from '.';
import { ToastProvider } from 'src/hooks/useToast';

describe('pages/Page404', () => {
  test('正しくレンダリングされている', () => {
    const target = render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <ToastProvider>
              <Page404 />
            </ToastProvider>
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );
    expect(target).toMatchSnapshot();
  });
});
