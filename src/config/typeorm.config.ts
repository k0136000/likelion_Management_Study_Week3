import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/users.entity';

type GenerateTypeOrmConfig = (env: NodeJS.ProcessEnv) => TypeOrmModuleOptions;

export const generateTypeOrmConfig: GenerateTypeOrmConfig = (env) => ({
  type: 'mysql',
  host: env.DATABASE_HOST,
  port: +env.DATABASE_PORT,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  synchronize: env.NODE_ENV === 'development', // 만약 node start:dev를 할 경우 true를 리턴.
  entities: [UserEntity],
  autoLoadEntities: true,
});
