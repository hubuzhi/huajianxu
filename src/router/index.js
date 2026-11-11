import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Welcome from '../pages/Welcome';
import Community from '../pages/Community';
import Tools from '../pages/Tools';
import Tutorials from '../pages/Tutorials';
import Collections from '../pages/Collections';
import Achievements from '../pages/Achievements';
import Garden from '../pages/Garden';
import PostDetail from '../pages/PostDetail';
import FlowerStory from '../pages/FlowerStory';
import SimilarFlowers from '../pages/SimilarFlowers';
import FlowerMatch from '../pages/FlowerMatch';
import SeasonClass from '../pages/SeasonClass';
import ColorClass from '../pages/ColorClass';
import FlowerDetail from '../pages/FlowerDetail';
import FlowerHome from '../pages/FlowerHome';
import FlowerDetailPage from '../pages/FlowerDetailPage';

// 后台管理页面
import FlowerManage from '../pages/FlowerManage';
import UserManage from '../pages/UserManage';
import ContentReview from '../pages/ContentReview';
import CommentManage from '../pages/CommentManage';
import OrderManage from '../pages/OrderManage';
import SystemSettings from '../pages/SystemSettings';
import DataReports from '../pages/DataReports';
import CustomerManage from '../pages/CustomerManage';
import MarketingManage from '../pages/MarketingManage';
import StaffManage from '../pages/StaffManage';
import RequireAuth from '../components/RequireAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/community',
    element: <Community />,
  },
  {
    path: '/community/post/:postId',
    element: <PostDetail />,
  },
  {
    path: '/tools',
    element: <Tools />,
  },
  {
    path: '/tutorials',
    element: <Tutorials />,
  },
  {
    path: '/collections',
    element: <RequireAuth><Collections /></RequireAuth>,
  },
  {
    path: '/achievements',
    element: <RequireAuth><Achievements /></RequireAuth>,
  },
  {
    path: '/garden',
    element: <RequireAuth><Garden /></RequireAuth>,
  },
  {
    path: '/flower/story/:flowerId',
    element: <FlowerStory />,
  },
  {
    path: '/flower/similar/:flowerId',
    element: <SimilarFlowers />,
  },
  {
    path: '/flower/match/:flowerId',
    element: <FlowerMatch />,
  },
  {
    path: '/season',
    element: <SeasonClass />,
  },
  {
    path: '/color',
    element: <ColorClass />,
  },
  {
    path: '/flower/:flowerName',
    element: <FlowerDetail />,
  },
  {
    path: '/flower-home',
    element: <FlowerHome />,
  },
  // 后台管理路由
  {
    path: '/flower-detail',
    element: <FlowerDetailPage />,
  },
  {
    path: '/admin/flowers',
    element: <RequireAuth roles={['admin']}><FlowerManage /></RequireAuth>,
  },
  {
    path: '/admin/users',
    element: <RequireAuth roles={['admin']}><UserManage /></RequireAuth>,
  },
  {
    path: '/admin/content',
    element: <RequireAuth roles={['admin']}><ContentReview /></RequireAuth>,
  },
  {
    path: '/admin/comments',
    element: <RequireAuth roles={['admin']}><CommentManage /></RequireAuth>,
  },
  {
    path: '/admin/orders',
    element: <RequireAuth roles={['admin']}><OrderManage /></RequireAuth>,
  },
  {
    path: '/admin/settings',
    element: <RequireAuth roles={['admin']}><SystemSettings /></RequireAuth>,
  },
  {
    path: '/admin/reports',
    element: <RequireAuth roles={['admin']}><DataReports /></RequireAuth>,
  },
  {
    path: '/admin/customers',
    element: <RequireAuth roles={['admin']}><CustomerManage /></RequireAuth>,
  },
  {
    path: '/admin/marketing',
    element: <RequireAuth roles={['admin']}><MarketingManage /></RequireAuth>,
  },
  {
    path: '/admin/staff',
    element: <RequireAuth roles={['admin']}><StaffManage /></RequireAuth>,
  },
]);

export default router;