import { Action, createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';
import { login, logout } from './auth.actions';

export const authReducer = createReducer(
  initialState,
  on(login, (state, { username, role }) => ({
    ...state,
    isAuthenticated: true,
    username,
    role,
  })),
  on(logout, () => initialState)
);
