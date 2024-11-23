import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout.tsx';
import Home from './pages/home/Home';
import BookDetail from './pages/book/BookDetail';
import GroupDetail from './pages/group/GroupDetail';
import MapSearch from './pages/map/MapSearch.tsx';
import GroupForm from './pages/group/GroupForm.tsx';
import ChatRoom from './pages/chat/ChatRoom.tsx';
import ChatList from './pages/chat/ChatList.tsx';
import Login from './pages/auth/Login.tsx';
import LoginLoading from "./pages/auth/LoginLoading.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import Register from "./pages/auth/Register.tsx";
import InitialScreen from "./pages/auth/InitialScreen.tsx";
import ApplyForm from "./pages/group/ApplyForm.tsx";
import ApplySuccess from "./pages/group/ApplySuccess.tsx";
import NotificationWindow from "./pages/notification/NotificationWindow.tsx";
import BookmarkPage from "./pages/like/BookmarkPage.tsx";
import GroupListPage from "./pages/like/GroupListPage.tsx";
import Like from "./pages/like/Like.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true, // 기본 경로 ("/")일 때 Home 컴포넌트 렌더링
        element: <Home />,
      },
      {
        path: 'books/:isbn',
        element: <BookDetail />,
      },
      {
        path: 'groups/new',
        element: <GroupForm />,
      },
      {
        path: 'groups/:groupId',
        element: <GroupDetail />,
      },
      {
        path: 'map',
        element: <MapSearch />,
      },
      {
        path: 'chat/:chatRoomId',
        element: <ChatRoom />
      },
      {
        path: 'chat',
        element: <ChatList />
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path: 'like',
        element: <Like />,
        children: [
          {
            index: true, // "/like" 경로일 때 리다이렉트
            element: <Navigate to="bookmark-page" replace />
          },
          {
            path: 'bookmark-page',
            element: <BookmarkPage />
          },
          {
            path: 'groupmark-page',
            element: <GroupListPage />
          }
        ]
      }
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/initial',
    element: <InitialScreen />
  },
  {
    path: '/login-loading',
    element: <LoginLoading />
  },
  {
    path: '/applyform',
    element: <ApplyForm />
  },
  {
    path: '/apply-success',
    element: <ApplySuccess />
  },
  {
    path: '/notificationWindow',
    element: <NotificationWindow />
  },
  {
    path: '*',
    element: <Navigate to="/" replace /> // 존재하지 않는 경로일 경우 홈으로 리다이렉트
  }
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
