import React from 'react';
import router from './router/router';
import { RouterProvider } from 'react-router-dom';
import './tailwind/index.css';

function App() {
  return (
    <div>
       <RouterProvider router={router}/>
    </div>
  )
}

export default App;
