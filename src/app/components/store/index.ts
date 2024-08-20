import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from './auth/auth.state';
import { authReducer } from './auth/auth.reducer';
import { AUTH_STATE_NAME } from './auth/auth.selector';

export interface AppState {
  [AUTH_STATE_NAME]: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  [AUTH_STATE_NAME]: authReducer,
};
