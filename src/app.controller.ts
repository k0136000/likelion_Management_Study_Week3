import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @Get('/config')
  getDatabaseHostFromConfigService(): string {
    console.log(this.config.get('DATABASE_HOST'));
    //get(환경변수 키값, 기본값)
    return this.config.get('DATABASE_HOST');
  }
}
