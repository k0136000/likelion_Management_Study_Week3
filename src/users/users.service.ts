import * as uuid from 'uuid';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { UserEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(UserEntity) // 유저 모듈 내에서 사용할 저장소 등록
    private userRepository: Repository<UserEntity>,
    private dataSource: DataSource, // 트랜잭션
  ) {}
  async createUser(name: string, email: string, password: string) {
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnprocessableEntityException(
        '해당 이메일로 가입이 되어 있는 상태입니다.',
      );
    }
    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    // await this.sendMemberJoinEmail(email, signupVerifyToken);
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new UserEntity(); // 새로운 유저 엔티티 객체 생성
    // user.id = ulid();
    user.id = '1234';
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    await this.userRepository.save(user); // 저장소를 이용해여 엔티티를 DB에 저장
    return;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private async saveUserUsingQueryRunner(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner(); //주입받은 DataSource 객체에서 QueryRunner 생성.
    await queryRunner.connect(); // queryRunner에서 DB연결 후
    await queryRunner.startTransaction(); //트랜잭션 시작.

    try {
      const user = new UserEntity(); // 새로운 유저 엔티티 객체 생성
      // user.id = ulid();
      user.id = '1234';
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;
      await queryRunner.manager.save(user); // 정상 작동을 수행하였다면 트랜잭션을 커밋하여 영속화
      await queryRunner.commitTransaction(); //DB작업을 수행 후 커밋해서 영속화를 완료
    } catch (e) {
      //에러 발생 시 롤백
      await queryRunner.rollbackTransaction();
    } finally {
      //직접 생성한 QueryRunner는 해제시켜주어야 힘.
      await queryRunner.release();
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private async checkUserExists(emailAddress: string) {
    const user = await this.userRepository.findOne({
      where: { email: emailAddress },
    });
    return user !== undefined; // 존재하는지 아닌지에 대한 bool값 리턴
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    // await this.emailService.sendMemberJoinVerification(
    //   email,
    //   signupVerifyToken,
    // );
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

  async getUserInfo(userId: number): Promise<string> {
    //userId를 가진 유저가 존재하는지
    throw new Error('Method not implemented');
  }

  async findAll() {
    console.log('pass');
  }
  async findOne(id: number) {
    console.log(id);
  }
}
function ulid(): string {
  throw new Error('Function not implemented.');
}
