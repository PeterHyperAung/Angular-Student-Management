export const initialState: AuthState = {
  username: null,
  role: null,
  isAuthenticated: false,
};

export type AuthState = {
  username: string | null;
  role: 'USER' | 'ADMIN' | null;
  isAuthenticated: boolean;
};
