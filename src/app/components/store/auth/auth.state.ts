export const initialState: AuthState = {
  username: null,
  role: null,
  isAuthenticated: false,
  token: null,
};

export type AuthState = {
  username: string | null;
  role: 'USER' | 'ADMIN' | null;
  isAuthenticated: boolean;
  token: string | null;
};
