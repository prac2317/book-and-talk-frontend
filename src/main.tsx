import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout.tsx';
import Home from './pages/home/Home';
import BookDetail from './pages/book/BookDetail';
import GroupDetail from './pages/group/GroupDetail';
import MapSearch from './pages/map/MapSearch.tsx';
import GroupForm from './pages/group/GroupForm.tsx';
import ChatRoom from './pages/chat/ChatRoom.tsx';
import ChatList from './pages/chat/ChatList.tsx';
import Login from './pages/auth/Login.tsx';

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
        path: '/groups/new',
        element: <GroupForm />,
      },
      {
        path: '/groups/:groupId',
        element: <GroupDetail />,
      },
      {
        path: '/map',
        element: <MapSearch />,
      },
      {
        path: '/chat/:chatRoomId',
        element: <ChatRoom />
      },
      {
        path: '/chat',
        element: <ChatList />
      },
      {
        path: '/login',
        element: <Login />
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
