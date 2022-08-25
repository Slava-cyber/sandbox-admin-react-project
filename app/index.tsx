import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import {BrowserRouter} from 'react-router-dom';
import { store } from './store/store'
import { Provider } from 'react-redux';

let root;
root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)