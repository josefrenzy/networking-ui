import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  loginWithGoogle: (user: User) => void;
  loginWithApple: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: false,
  });

  const loginWithGoogle = useCallback((user: User) => {
    setState({ user, isAuthenticated: true, loading: false });
  }, []);

  const loginWithApple = useCallback((user: User) => {
    setState({ user, isAuthenticated: true, loading: false });
  }, []);

  const logout = useCallback(() => {
    setState({ user: null, isAuthenticated: false, loading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, loginWithGoogle, loginWithApple, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
