// AuthGaurd 클래스에서 선언해 주었던 request.user 객체의 정보를 읽어오려고 할때 유저의 정보를 읽어와주는 커스텀 테커레이터.

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator(
  (data, ctx: ExecutionContext): ParameterDecorator => {
    // 클라이언트에서 보낸 request의 정보를 가져옵니다.
    const request = ctx.switchToHttp().getRequest();

    // 이전에 AuthGuard 클래스에서 할당했던 request.user 객체의 정보를 return 해줍니다.
    return request.user;
  },
);
