import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

//들어온 요청에 포함된 정보를 로깅하기 위한 Logger 미들웨어
@Injectable()
export class Logger3Middleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request3...');
    next();
  }
}
