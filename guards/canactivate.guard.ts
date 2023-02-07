import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ContextIdFactory } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  //jwt 인가.
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private validateRequest(request: any) {
    const jwtString = request.headers.authorization.split('Beearer '[1]);

    this.authService.verify(jwtString);
    return true;
  }
}
