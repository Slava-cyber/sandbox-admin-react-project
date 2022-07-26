import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';

let root;
root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)