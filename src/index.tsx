import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import Main from './pages/Main';

ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>,
  document.getElementById('root')
);
