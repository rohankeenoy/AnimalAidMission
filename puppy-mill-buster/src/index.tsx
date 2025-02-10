import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import React from 'react';
import { createRoot } from 'react-dom/client';
import { InformationPage } from './modules/pages';
import { GenerateReport } from './modules/pages';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <InformationPage />
  },
  {
    path: '/report',
    element: <GenerateReport />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
createRoot(document.getElementById('root') as Element).render(<App />)