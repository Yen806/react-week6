import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router'
import router from './router';
import './assets/scss/all.scss'


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
