import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_PIPE } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AuthModule } from './infrastructure/modules/auth/auth.module'
import { UserModule } from './infrastructure/modules/user/user.module'
import { ServiceModule } from './infrastructure/modules/service/service.module'
import { UserOrmEntity } from './infrastructure/database/typeorm/entities/user.orm-entity'
import { ServiceOrmEntity } from './infrastructure/database/typeorm/entities/service.orm-entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
      entities: [UserOrmEntity, ServiceOrmEntity],
      migrations: [
        __dirname +
          '/infrastructure/database/typeorm/migrations/*{.ts,.js}',
      ],
      migrationsRun: true,
      synchronize: false,
      logging: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    UserModule,
    ServiceModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
