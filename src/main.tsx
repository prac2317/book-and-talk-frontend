import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout.tsx';
import Home from './pages/home/Home';
import BookDetail from './pages/book/BookDetail';
import GroupDetail from './pages/group/GroupDetail';
import MapSearch from './pages/map/MapSearch.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/books/:isbn',
        element: <BookDetail />,
      },
      {
        path: '/groups/:groupId',
        element: <GroupDetail />,
      },
      {
        path: '/map',
        element: <MapSearch />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
