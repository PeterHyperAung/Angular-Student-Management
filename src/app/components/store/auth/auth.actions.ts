import { createAction, props } from '@ngrx/store';
import { AuthState } from './auth.state';

export const login = createAction(
  '[Auth] Login',
  props<Omit<AuthState, 'isAuthenticated'>>()
);

export const logout = createAction('[Auth] Logout');
