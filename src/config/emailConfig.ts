import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.AUTHEMAIL,
    pass: process.env.AUTHEMAILPASSWORD,
  },
  baseUrl: process.env.EMAIL_BASE_URL,
}));
