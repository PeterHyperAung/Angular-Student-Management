import { firstValueFrom, Observable } from 'rxjs';
import { JwtService } from './service/jwt.service';

export function initializeApp(jwtService: JwtService) {
  return async () => {
    const token = jwtService.getLocalStroageToken();
    if (!token) return jwtService.removeToken();

    try {
      const res = await firstValueFrom(
        jwtService.checkAndSetToken() as Observable<any>
      );
      if (res.status !== 'SUCCESS') return jwtService.removeToken();
      jwtService.setToken(token);
    } catch (e: any) {
      jwtService.removeToken();
    }

    return Promise.resolve();
  };
}
