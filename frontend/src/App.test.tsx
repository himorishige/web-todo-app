import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

describe('App', () => {
  describe('#Rendering', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <HelmetProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HelmetProvider>
        </Provider>,
      );
    });

    test('アプリケーションのタイトルが表示されている', () => {
      expect(screen.getByRole('heading')).toHaveTextContent('ToDo App');
    });
  });
});
