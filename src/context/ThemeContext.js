import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const ThemeContext = createContext();

const STORAGE_KEY = 'huaJianXuTheme';

export const lightTheme = {
  name: 'light',
  colors: {
    primary: '#ff4d4f',
    primaryGradient: 'linear-gradient(135deg, #ff6b7a 0%, #ff4d4f 100%)',
    primaryHover: 'linear-gradient(135deg, #ff5252 0%, #e64545 100%)',
    background: '#f5f7fa',
    surface: '#ffffff',
    surfaceHover: '#fff5f6',
    border: '#f0f0f0',
    borderDark: '#e8e8e8',
    text: '#333333',
    textSecondary: '#666666',
    textMuted: '#999999',
    textInverse: '#ffffff',
    shadow: 'rgba(0, 0, 0, 0.04)',
    shadowHover: 'rgba(0, 0, 0, 0.08)',
    cardShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    cardShadowHover: '0 4px 16px rgba(0, 0, 0, 0.08)',
    modalOverlay: 'rgba(0, 0, 0, 0.45)',
    tableHeader: '#fafbfc',
    tableStripe: '#fafafa',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',
    successBg: 'rgba(82, 196, 26, 0.1)',
    warningBg: 'rgba(250, 173, 20, 0.1)',
    errorBg: 'rgba(255, 77, 79, 0.1)',
    infoBg: 'rgba(24, 144, 255, 0.1)',
  },
};

export const darkTheme = {
  name: 'dark',
  colors: {
    primary: '#ff6b7a',
    primaryGradient: 'linear-gradient(135deg, #ff6b7a 0%, #ff4d4f 100%)',
    primaryHover: 'linear-gradient(135deg, #ff5252 0%, #e64545 100%)',
    background: '#1a1a2e',
    surface: '#252540',
    surfaceHover: '#2f2f4a',
    border: '#3a3a5c',
    borderDark: '#4a4a6c',
    text: '#e8e8f0',
    textSecondary: '#a0a0b8',
    textMuted: '#707088',
    textInverse: '#1a1a2e',
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowHover: 'rgba(0, 0, 0, 0.5)',
    cardShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    cardShadowHover: '0 4px 16px rgba(0, 0, 0, 0.4)',
    modalOverlay: 'rgba(0, 0, 0, 0.7)',
    tableHeader: '#2a2a45',
    tableStripe: '#252540',
    success: '#73d13d',
    warning: '#ffc53d',
    error: '#ff6b7a',
    info: '#40a9ff',
    successBg: 'rgba(115, 209, 61, 0.2)',
    warningBg: 'rgba(255, 197, 61, 0.2)',
    errorBg: 'rgba(255, 107, 122, 0.2)',
    infoBg: 'rgba(64, 169, 255, 0.2)',
  },
};

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      return saved === 'dark';
    }
  } catch (e) {
    console.warn('Failed to load theme from localStorage:', e);
  }
  return false;
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e);
    }
  }, [isDark]);

  useEffect(() => {
    if (transitioning) {
      const timer = setTimeout(() => setTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [transitioning]);

  const theme = useMemo(() => isDark ? darkTheme : lightTheme, [isDark]);

  const toggleTheme = () => {
    setTransitioning(true);
    setIsDark(prev => !prev);
  };

  const setTheme = (dark) => {
    setTransitioning(true);
    setIsDark(dark);
  };

  const value = useMemo(() => ({
    theme,
    isDark,
    toggleTheme,
    setTheme,
    transitioning,
  }), [theme, isDark, transitioning]);

  return (
    <ThemeContext.Provider value={value}>
      <div style={{
        transition: 'background-color 0.3s ease, color 0.3s ease',
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        minHeight: '100vh',
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export function createThemedStyles(baseStyles, getColor) {
  return (theme) => {
    const colors = theme.colors;
    const transformed = {};
    for (const [key, value] of Object.entries(baseStyles)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        transformed[key] = {};
        for (const [prop, val] of Object.entries(value)) {
          if (typeof val === 'string' && val.startsWith('--')) {
            const colorKey = val.slice(2);
            transformed[key][prop] = colors[colorKey] || val;
          } else {
            transformed[key][prop] = val;
          }
        }
      } else {
        transformed[key] = value;
      }
    }
    return transformed;
  };
}