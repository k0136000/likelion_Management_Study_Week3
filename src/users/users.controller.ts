import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {} //UserService를 컨트롤러에 주입합니다.

  //회원가입 로직
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.userService.createUser(name, email, password);
    console.log(dto);
  }
  //이메일 인증 로직
  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;
    return await this.userService.verifyEmail(signupVerifyToken);
  }
  //로그인 로직
  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;

    return await this.userService.login(email, password);
  }

  @Get('/:id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.findOne(id);
  }

  @Get()
  findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(0), ParseIntPipe) limit: number,
  ) {
    console.log(offset, limit);
    return this.userService.findAll();
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<string> {
    return await this.userService.getUserInfo(userId);
  }
}
