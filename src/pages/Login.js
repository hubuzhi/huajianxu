import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { initUsers, loginUser } from '../data/users';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  // 被路由守卫拦截时记录的来源路径，登录成功后优先回跳
  const from = location.state && location.state.from;


  useEffect(() => {
    initUsers();
  }, []);

  const validateField = (fieldName, value) => {
    let error = '';
    switch (fieldName) {
      case 'username':
        if (!value.trim()) {
          error = '请输入用户名';
        } else if (value.length < 3) {
          error = '用户名至少3个字符';
        }
        break;
      case 'password':
        if (!value.trim()) {
          error = '请输入密码';
        } else if (value.length < 6) {
          error = '密码至少6个字符';
        }
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [fieldName]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (fieldName) => {
    setFocusedField('');
    validateField(fieldName, formData[fieldName]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isUsernameValid = validateField('username', formData.username);
    const isPasswordValid = validateField('password', formData.password);
    
    if (!isUsernameValid || !isPasswordValid) {
      return;
    }

    setLoading(true);

    try {
      const userData = loginUser(formData.username, formData.password);
      console.log('登录成功:', userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      navigate(from || '/home', { replace: true });
    } catch (error) {
      console.error('登录失败:', error);
      if (error.code === 401 && error.message === 'USER_NOT_REGISTERED') {
        setErrorMessage(error.detail);
        setShowModal(true);
      } else {
        alert(error.detail || error.message || '登录失败');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoRegister = () => {
    setShowModal(false);
    navigate('/register');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={styles.container}>
      {/* 花卉暗纹背景 */}
      <div style={styles.floralPattern}></div>
      
      {/* 柔光动态效果 */}
      <div style={styles.softLight} className="soft-light-animation"></div>

      {/* 表单卡片 */}
      <div style={styles.formCard}>
        {/* Logo和标题 */}
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>🌸</div>
          <h1 style={styles.title}>花间序</h1>
          <p style={styles.subtitle}>Flower Sequence</p>
        </div>

        {/* 登录表单 */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* 用户名输入框 */}
          <div style={styles.inputWrapper}>
            <span style={styles.inputLabel}>用户名</span>
            <input
              type="text"
              name="username"
              placeholder="用户名"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => handleFocus('username')}
              onBlur={() => handleBlur('username')}
              style={{
                ...styles.input,
                borderColor: focusedField === 'username' ? '#FFB6C1' : errors.username ? '#FF6B6B' : '#E8E8E8',
                boxShadow: focusedField === 'username' ? '0 0 15px rgba(255,182,193,0.3)' : 'none',
              }}
            />
          </div>
          {errors.username && <p style={styles.errorText}>{errors.username}</p>}

          {/* 密码输入框 */}
          <div style={styles.inputWrapper}>
            <span style={styles.inputLabel}>密码</span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="密码"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              style={{
                ...styles.input,
                borderColor: focusedField === 'password' ? '#FFB6C1' : errors.password ? '#FF6B6B' : '#E8E8E8',
                boxShadow: focusedField === 'password' ? '0 0 15px rgba(255,182,193,0.3)' : 'none',
                paddingRight: '50px',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <p style={styles.errorText}>{errors.password}</p>}

          {/* 记住我和忘记密码 */}
          <div style={styles.formOptions}>
            <label style={styles.rememberMe}>
              <input type="checkbox" style={styles.checkbox} />
              <span style={styles.rememberText}>记住我</span>
            </label>
            <Link to="/forgot-password" style={styles.forgotLink}>忘记密码?</Link>
          </div>

          {/* 登录按钮 */}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? (
              <span style={styles.loaderContainer}>
                <span className="loader"></span>
                <span style={styles.loaderText}>登录中...</span>
              </span>
            ) : (
              '登录'
            )}
          </button>
        </form>

        {/* 分割线 */}
        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>或</span>
          <span style={styles.dividerLine}></span>
        </div>

        {/* 跳转注册 */}
        <p style={styles.registerPrompt}>
          还没有账号? <Link to="/register" style={styles.registerLink}>立即注册</Link>
        </p>
      </div>

      {/* 账号未注册提示框 */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalIcon}>⚠️</div>
            <h3 style={styles.modalTitle}>账号未注册</h3>
            <p style={styles.modalMessage}>{errorMessage}</p>
            <div style={styles.modalButtons}>
              <button style={styles.modalCancelBtn} onClick={handleCloseModal}>
                取消
              </button>
              <button style={styles.modalRegisterBtn} onClick={handleGoRegister}>
                去注册
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #FFF0F5 0%, #E6F4F9 50%, #F5F0FF 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
  },
  floralPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFB6C1' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    pointerEvents: 'none',
    zIndex: 0,
  },
  softLight: {
    position: 'absolute',
    width: '800px',
    height: '800px',
    top: '10%',
    right: '-200px',
    background: 'radial-gradient(circle, rgba(255,182,193,0.2) 0%, transparent 70%)',
    borderRadius: '50%',
    zIndex: 0,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    padding: '50px 40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 10px 40px rgba(255,182,193,0.15), 0 2px 10px rgba(0,0,0,0.05)',
    border: '1px solid #F0F0F0',
    position: 'relative',
    zIndex: 10,
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  logoIcon: {
    fontSize: '56px',
    marginBottom: '12px',
    animation: 'bounce 2s ease-in-out infinite',
  },
  title: {
    fontSize: '32px',
    fontWeight: '600',
    color: '#333333',
    margin: '0 0 8px 0',
    background: 'linear-gradient(90deg, #FFB6C1, #87CEEB)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '14px',
    color: '#999999',
    margin: 0,
    letterSpacing: '4px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputLabel: {
    position: 'absolute',
    left: '15px',
    fontSize: '14px',
    color: '#999999',
    fontWeight: '500',
    zIndex: 1,
  },
  input: {
    width: '100%',
    padding: '16px 16px 16px 70px',
    fontSize: '15px',
    border: '1px solid #E8E8E8',
    borderRadius: '12px',
    outline: 'none',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  passwordToggle: {
    position: 'absolute',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    padding: 0,
    zIndex: 1,
  },
  errorText: {
    fontSize: '13px',
    color: '#FF6B6B',
    margin: '4px 0 0 0',
    paddingLeft: '70px',
  },
  formOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
    padding: '0 8px',
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    accentColor: '#FFB6C1',
    cursor: 'pointer',
  },
  rememberText: {
    fontSize: '14px',
    color: '#666666',
    marginLeft: '8px',
  },
  forgotLink: {
    fontSize: '14px',
    color: '#FFB6C1',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  button: {
    padding: '16px',
    fontSize: '16px',
    fontWeight: '500',
    background: 'linear-gradient(135deg, #FFB6C1 0%, #87CEEB 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    marginTop: '12px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255,182,193,0.4)',
  },
  loaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  loaderText: {
    fontSize: '14px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '24px 0',
    gap: '16px',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#E8E8E8',
  },
  dividerText: {
    fontSize: '14px',
    color: '#999999',
  },
  registerPrompt: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666666',
    margin: 0,
  },
  registerLink: {
    color: '#FFB6C1',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    padding: '32px',
    width: '100%',
    maxWidth: '360px',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
    animation: 'slideUp 0.3s ease',
  },
  modalIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333333',
    margin: '0 0 12px 0',
  },
  modalMessage: {
    fontSize: '14px',
    color: '#666666',
    margin: '0 0 24px 0',
    lineHeight: '1.6',
  },
  modalButtons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  modalCancelBtn: {
    padding: '12px 28px',
    fontSize: '14px',
    backgroundColor: '#F5F5F5',
    color: '#666666',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  modalRegisterBtn: {
    padding: '12px 28px',
    fontSize: '14px',
    background: 'linear-gradient(135deg, #FFB6C1 0%, #87CEEB 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes softLightMove {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-50px, 30px) scale(1.1); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .soft-light-animation {
    animation: softLightMove 8s ease-in-out infinite;
  }
  .loader {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #FFFFFF;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  input::placeholder {
    color: '#CCCCCC';
  }
  button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255,182,193,0.5);
  }
  button:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(255,182,193,0.3);
  }
  a:hover {
    color: '#FF69B4';
  }
`;
document.head.appendChild(styleSheet);

export default Login;
