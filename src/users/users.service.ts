import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  constructor(private emailService: EmailService) {}
  async createUser(name: string, email: string, password: string) {
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private checkUserExists(email: string) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  async login(email: string, password: string): Promise<string> {
    //email, password를 가진 유저가 존재하는지 DB에서 확인, 없다면 에러 처리, JWT 발급
    throw new Error('Method not implemented');
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    //DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회, 없다면 에러 처리
    // 조회 성공시 바로 로그인 상태가 되도록 JWT 발급.
    throw new Error('Method not implemented');
  }

  async getUserInfo(userId: string): Promise<string> {
    //userId를 가진 유저가 존재하는지
    throw new Error('Method not implemented');
  }
}
