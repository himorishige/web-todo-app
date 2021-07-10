import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

describe('App', () => {
  describe('#Rendering', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <App />
        </Provider>,
      );
    });

    test('アプリケーションのタイトルが表示されている', () => {
      expect(screen.getByRole('heading')).toHaveTextContent('Web ToDo App');
    });
  });
});
