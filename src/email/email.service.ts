import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Inject, Injectable } from '@nestjs/common';
import emailConfig from 'src/config/emailConfig';
import { ConfigType } from '@nestjs/config';

//메일 옵션 타입
interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
  ) {
    //nodemailer에서 제공하는 Tranformer 객체를 생성
    this.transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = this.config.baseUrl;

    // signupVerifyToken은 회원 가입시 서버에서 발급한 임의의 문자열
    // 이메일 인증 확인 버튼을 누르면 이 토큰을 Post/users/email-veriy엔드포인트로 요청.
    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`; //유저가 가질 링크를 생성합니다. 이링크를 통해 다시 우리 서비스로 인증 요청이 들어옵니다.

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입인증메일',
      //메일 본문을 구성합니다. form 태그를 이요하여 POST 요청을 합니다.
      html: `
            가입확인 버튼을 누르시면 가입 인증이 완료됩니다.<br/>
            <form action="${url}" method="POST">
                <button>가입확인</button>
            </form>
        `,
    };

    return await this.transporter.sendMail(mailOptions); //transformer 객체를 이용하여 메일을 전송합니다.
  }
}
