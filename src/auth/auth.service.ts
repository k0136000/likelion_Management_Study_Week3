import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import autoConfig from 'src/config/authConfig';
import { ConfigType } from '@nestjs/config';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(autoConfig.KEY) private config: ConfigType<typeof autoConfig>,
  ) {}

  login(user: User) {
    const payload = { ...user };
    //user service에서 login 함수를 호출 시 전달되는 페이로드(id,name,email)와 jwtsecret을 넘겨 받아 유효기간 및 전달대상을 지정 후 토큰을 리턴.
    return jwt.sign(payload, this.config.jwtSecret, {
      expiresIn: '1d',
      audience: 'example.com', //누구에게 토큰이 전달되는가
      issuer: 'example.com',
    });
  }

  verify(jwtString: string) {
    try {
      //verify()를 통해 검증을 수행, 리턴 값으로 토큰 속에 있던 id,email 정보 등이 리턴.
      const payload = jwt.verify(jwtString, this.config.jwtSecret) as (
        | jwt.JwtPayload
        | string
      ) &
        User;
      console.log(jwtString);
      console.log(payload);
      const { id, email } = payload;

      console.log('통과');
      return {
        userId: id,
        email,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
