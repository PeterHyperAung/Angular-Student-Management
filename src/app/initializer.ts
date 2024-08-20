import { firstValueFrom, Observable } from 'rxjs';
import { JwtService } from './service/jwt.service';
import { AuthState } from './components/store/auth/auth.state';
import { Store } from '@ngrx/store';
import { login } from './components/store/auth/auth.actions';

export function initializeApp(jwtService: JwtService, store: Store<AuthState>) {
  return async () => {
    const token = jwtService.getLocalStroageToken();
    if (!token) return jwtService.removeToken();

    try {
      const res = await firstValueFrom(
        jwtService.checkAndSetToken() as Observable<any>
      );
      if (res.status !== 'SUCCESS') return jwtService.removeToken();
      const user = jwtService.parseJwt(token);
      store.dispatch(
        login({ username: user.username, role: user.role, token })
      );
    } catch (e: any) {
      console.log(e);
      jwtService.removeToken();
    }

    return Promise.resolve();
  };
}
