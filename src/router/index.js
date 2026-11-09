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
    element: <Collections />,
  },
  {
    path: '/achievements',
    element: <Achievements />,
  },
  {
    path: '/garden',
    element: <Garden />,
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
    element: <FlowerManage />,
  },
  {
    path: '/admin/users',
    element: <UserManage />,
  },
  {
    path: '/admin/content',
    element: <ContentReview />,
  },
  {
    path: '/admin/comments',
    element: <CommentManage />,
  },
  {
    path: '/admin/orders',
    element: <OrderManage />,
  },
  {
    path: '/admin/settings',
    element: <SystemSettings />,
  },
  {
    path: '/admin/reports',
    element: <DataReports />,
  },
  {
    path: '/admin/customers',
    element: <CustomerManage />,
  },
  {
    path: '/admin/marketing',
    element: <MarketingManage />,
  },
  {
    path: '/admin/staff',
    element: <StaffManage />,
  },
]);

export default router;