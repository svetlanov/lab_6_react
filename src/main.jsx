import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import {store} from './store/store.js';

import './index.css'
import App from './App.jsx'

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  ,
);
