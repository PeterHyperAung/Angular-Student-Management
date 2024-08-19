import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectUsername = createSelector(
  selectAuthState,
  (state: AuthState) => state.username
);

export const selectRole = createSelector(
  selectAuthState,
  (state: AuthState) => state.role
);
