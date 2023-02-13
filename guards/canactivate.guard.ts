import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 클라이언트에서 보낸 request 정보를 읽어 줍니다.
    const request = context.switchToHttp().getRequest();
    //jwt 인가 함수 호출
    request.user = this.validateRequest(request);
    return true;
  }

  //jwt 인가.
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private async validateRequest(request: Request) {
    const jwtString = request.headers.authorization.split('Bearer ')[1];

    if (!jwtString) {
      throw new UnauthorizedException(); //예외처리에 대한 공부를 더 한후 수정하겠습니다.
    }
    const user = await this.authService.verify(jwtString);

    return user;
  }
}
