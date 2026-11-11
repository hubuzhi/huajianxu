import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * 路由守卫组件
 *
 * 作用：在进入目标页面前统一做鉴权判断，解决"直接输入 URL 就能进后台"的问题。
 * 规则：
 *   1. 没有 token 或没有用户信息 → 未登录，跳转登录页，并记录当前路径，
 *      登录成功后自动回到原页面；
 *   2. 指定了 roles 但当前用户角色不在其中 → 无权限，跳回首页；
 *   3. 校验通过 → 正常渲染子组件。
 *
 * 用法：
 *   <RequireAuth>...</RequireAuth>                      仅需登录
 *   <RequireAuth roles={['admin']}>...</RequireAuth>    需要管理员角色
 */
function RequireAuth({ children, roles }) {
  const location = useLocation();

  // 登录信息由 Login 页写入 localStorage，这里统一读取并做容错
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch (e) {
    user = null;
  }
  const token = localStorage.getItem('token');

  // 1. 未登录：跳登录页，携带来源路径
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // 2. 角色不符：跳回首页
  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  // 3. 校验通过，正常渲染
  return children;
}

export default RequireAuth;
