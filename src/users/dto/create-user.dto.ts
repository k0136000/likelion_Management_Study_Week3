import {
  IsString,
  MinLength,
  Matches,
  MaxLength,
  IsEmail,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { NotIn } from '../../../utils/not-in';
export class CreateUserDto {
  // @Transform((params) => {
  //   console.log(params);
  //   // return params.value;
  // })
  //@IsString()
  // @MinLength(1)
  // @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  // @Transform((params) => params.value.trim())
  // eslint-disable-next-line prettier/prettier
  // @NotIn('password', { message: 'password는 name과 같은 문자열을 포함할 수 없습니다.' })
  @IsString()
  // @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
