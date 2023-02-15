import { Module } from '@nestjs/common';
import { MyLogger } from 'src/logger/MyLogger';

@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
