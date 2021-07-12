import React from 'react';
import ReactDOM from 'react-dom';
import App from 'src/App';
import { store } from 'src/app/store';
import { Provider } from 'react-redux';
import { Global } from '@emotion/react';
import * as serviceWorker from 'src/serviceWorker';
import 'sanitize.css';
import { globalStyle } from 'src/styles/globalStyle';
import { ToastProvider } from './hooks/useToast';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Global styles={globalStyle} />
      <ToastProvider>
        <App />
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
