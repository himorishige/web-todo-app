import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from './hooks/useToast';

describe('App', () => {
  describe('#Rendering', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <HelmetProvider>
            <BrowserRouter>
              <ToastProvider>
                <App />
              </ToastProvider>
            </BrowserRouter>
          </HelmetProvider>
        </Provider>,
      );
    });

    test('アプリケーションのタイトルが表示されている', async () => {
      expect(await screen.findByRole('heading')).toHaveTextContent('ToDo App');
    });
  });
});
