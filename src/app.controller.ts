import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'guards/canactivate.guard';

@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @UseGuards(AuthGuard) // 만약 여러 종류의 가드를 적용하고 싶다면 쉼표로 이어 선언하면 됨.
  @Get()
  getHello(): string {
    console.log('helloworld');
    return;
  }

  @Get('/config')
  getDatabaseHostFromConfigService(): string {
    console.log(this.config.get('DATABASE_HOST'));
    //get(환경변수 키값, 기본값)
    return this.config.get('DATABASE_HOST');
  }
}
