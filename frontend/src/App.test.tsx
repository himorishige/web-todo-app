import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  describe('#Rendering', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>,
      );
    });

    test('アプリケーションのタイトルが表示されている', () => {
      expect(screen.getByRole('heading')).toHaveTextContent('ToDo App');
    });
  });
});
