import { ConsoleLogger, LoggerService, LogLevel } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    // eslint-disable-next-line prefer-rest-params
    super.error.apply(this, arguments);
    this.doSomething();
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private doSomething() {
    // 여기에 로깅에 관련된 부가 로직을 추가한다.
    // DB에 저장하기 등등
    return;
  }
}
