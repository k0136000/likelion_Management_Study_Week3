import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'guards/canactivate.guard';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {} //UserService, authService를 컨트롤러에 주입합니다.

  //회원가입
  @Post('/save')
  async createUser(@Body(ValidationPipe) dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.userService.createUser(name, email, password);
    console.log(dto);
  }
  //이메일 인증, 회원이 이메일 인증 확인 버튼 클릭시 요청됨.
  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;
    return await this.userService.verifyEmail(signupVerifyToken);
  }
  //로그인
  @Post('/login')
  async login(@Body(ValidationPipe) dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;
    console.log(email, password);
    return await this.userService.login(email, password);
  }

  //회원 정보 조회
  @UseGuards(AuthGuard)
  @Get('/getInfo/:userId')
  async getUserInfo(
    @Headers() headers: any,
    @Param(
      'userId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: string,
  ) {
    console.log(userId);
    const jwtString = headers.authorization.split('Bearer ')[1]; //헤더에서 Jwt 파싱

    this.authService.verify(jwtString); //토큰 인증

    return await this.userService.getUserInfo(userId);
  }

  @Get()
  findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(0), ParseIntPipe) limit: number,
  ) {
    console.log(offset, limit);
    return this.userService.findAll();
  }
}
