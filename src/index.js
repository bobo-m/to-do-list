import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Tasklist from './components/Tasklist';
import Taskcard from './components/Taskcard';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children:[
      {
        path: 'all-tasks',
        element: <Tasklist/>,
        children: [
          {
            path: ':task',
            element: <Taskcard/>
          }
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
