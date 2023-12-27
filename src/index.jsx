import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Root from './routes/Root.jsx'
import { Pokedex } from './routes/Pokedex.jsx'
import { Types } from './routes/Types.jsx'
import { About } from './routes/About.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Pokedex />,
      },
      {
        path: 'pokedex',
        element: <Pokedex />,
      },
      {
        path: 'types',
        element: <Types />,
      },
      {
        path: 'about',
        element: <About />,
      }
    ],
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
