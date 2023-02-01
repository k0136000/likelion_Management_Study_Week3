import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    //(1)metatype이 비어있거나, 파이프가 지원하는 타입인지 검사
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    //(2)plainToClass를 통해 순수 js 객체를 클래스의 객체로 바꿔줌.
    const object = plainToClass(metatype, value);
    //(3)유효성 검사
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
  //toValdiate 함수 선언
  // eslint-disable-next-line @typescript-eslint/member-ordering, @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
