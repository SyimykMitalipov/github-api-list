import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { routeConfig } from 'app/providers/router';
import { Provider } from 'react-redux';
import 'app/styles/index.scss'
import { store } from 'app/providers/router/StoreProvider';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={routeConfig} />
  </Provider>
);

