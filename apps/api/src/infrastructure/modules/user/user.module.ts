import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller'
import { UserOrmEntity } from '../../database/typeorm/entities/user.orm-entity'
import { UserTypeOrmRepository } from '../../database/typeorm/repositories/user.typeorm-repository'
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository'
import { AuthModule } from '../auth/auth.module'
import { CreateUserUseCase } from '../../../application/use-cases/user/create-user.use-case'
import { GetUserUseCase } from '../../../application/use-cases/user/get-user.use-case'
import { UpdateUserUseCase } from '../../../application/use-cases/user/update-user.use-case'
import { DeleteUserUseCase } from '../../../application/use-cases/user/delete-user.use-case'

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity]), AuthModule],
  controllers: [UserController],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserTypeOrmRepository },
    CreateUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
