import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServiceController } from './service.controller'
import { ServiceOrmEntity } from '../../database/typeorm/entities/service.orm-entity'
import { ServiceTypeOrmRepository } from '../../database/typeorm/repositories/service.typeorm-repository'
import { SERVICE_REPOSITORY } from '../../../domain/repositories/service.repository'
import { CreateServiceUseCase } from '../../../application/use-cases/service/create-service.use-case'
import { GetServiceUseCase } from '../../../application/use-cases/service/get-service.use-case'
import { UpdateServiceUseCase } from '../../../application/use-cases/service/update-service.use-case'
import { DeleteServiceUseCase } from '../../../application/use-cases/service/delete-service.use-case'

@Module({
  imports: [TypeOrmModule.forFeature([ServiceOrmEntity])],
  controllers: [ServiceController],
  providers: [
    { provide: SERVICE_REPOSITORY, useClass: ServiceTypeOrmRepository },
    CreateServiceUseCase,
    GetServiceUseCase,
    UpdateServiceUseCase,
    DeleteServiceUseCase,
  ],
})
export class ServiceModule {}
