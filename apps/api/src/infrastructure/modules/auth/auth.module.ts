import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { AUTH_PORT } from '../../../application/ports/auth.port'
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository'
import { UserTypeOrmRepository } from '../../database/typeorm/repositories/user.typeorm-repository'
import { UserOrmEntity } from '../../database/typeorm/entities/user.orm-entity'
import { CreateUserUseCase } from '../../../application/use-cases/user/create-user.use-case'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'changeme',
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([UserOrmEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: AUTH_PORT, useExisting: AuthService },
    { provide: USER_REPOSITORY, useClass: UserTypeOrmRepository },
    CreateUserUseCase,
  ],
  exports: [AuthService, AUTH_PORT],
})
export class AuthModule {}
