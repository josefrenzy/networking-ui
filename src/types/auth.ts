export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider: 'google' | 'apple';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
