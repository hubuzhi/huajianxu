// 用户数据管理模块
// 使用 localStorage 模拟数据库存储

const USERS_KEY = 'flower_shop_users';

// 初始用户数据
const initialUsers = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', createdAt: new Date().toISOString() },
  { id: 2, username: 'user', password: 'user123', role: 'user', createdAt: new Date().toISOString() },
];

// 初始化用户数据
export const initUsers = () => {
  const existingUsers = localStorage.getItem(USERS_KEY);
  if (!existingUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
  }
};

// 获取所有用户
export const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : initialUsers;
};

// 根据用户名查找用户
export const getUserByUsername = (username) => {
  const users = getUsers();
  return users.find(user => user.username === username);
};

// 注册新用户
export const registerUser = (username, password) => {
  const users = getUsers();
  
  // 检查用户名是否已存在
  const existingUser = getUserByUsername(username);
  if (existingUser) {
    throw new Error('用户名已存在');
  }
  
  // 创建新用户
  const newUser = {
    id: users.length + 1,
    username,
    password,
    role: 'user',
    createdAt: new Date().toISOString(),
  };
  
  // 保存到数据库
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return newUser;
};

// 登录验证
export const loginUser = (username, password) => {
  const user = getUserByUsername(username);
  
  if (!user) {
    throw {
      code: 401,
      message: 'USER_NOT_REGISTERED',
      detail: '该账号尚未注册'
    };
  }
  
  if (user.password !== password) {
    throw {
      code: 400,
      message: 'PASSWORD_ERROR',
      detail: '密码错误，请重试'
    };
  }
  
  // 返回用户信息（不包含密码）
  const { password: _, ...userWithoutPassword } = user;
  return {
    ...userWithoutPassword,
    token: 'token_' + Date.now() + '_' + user.id
  };
};

// 删除用户
export const deleteUser = (userId) => {
  const users = getUsers();
  const filteredUsers = users.filter(user => user.id !== userId);
  localStorage.setItem(USERS_KEY, JSON.stringify(filteredUsers));
  return filteredUsers;
};

// 更新用户信息
export const updateUser = (userId, updates) => {
  const users = getUsers();
  const index = users.findIndex(user => user.id === userId);
  if (index === -1) {
    throw new Error('用户不存在');
  }
  
  users[index] = { ...users[index], ...updates };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return users[index];
};
