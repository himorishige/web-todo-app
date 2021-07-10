import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import * as serviceWorker from './serviceWorker';
import { globalStyle } from './styles/globalStyle';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Global
        styles={css`
          ${emotionReset}
          ${globalStyle}
        `}
      />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
