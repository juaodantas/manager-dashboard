import { Inject, NotFoundException } from '@nestjs/common'
import { Service, ServiceStats } from '../../../domain/entities/service.entity'
import { IServiceRepository, SERVICE_REPOSITORY } from '../../../domain/repositories/service.repository'

export class GetServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY) private readonly serviceRepo: IServiceRepository,
  ) {}

  async getAll(): Promise<{ servicos: Service[]; count: number }> {
    const servicos = await this.serviceRepo.findAll()
    return { servicos, count: servicos.length }
  }

  async getById(id: string): Promise<Service> {
    const service = await this.serviceRepo.findById(id)
    if (!service) {
      throw new NotFoundException(`Service with id "${id}" not found`)
    }
    return service
  }

  async getByStatus(status: string): Promise<Service[]> {
    return this.serviceRepo.findByStatus(status)
  }

  async getByClienteId(clienteId: string): Promise<Service[]> {
    return this.serviceRepo.findByClienteId(clienteId)
  }

  async getStats(): Promise<ServiceStats> {
    return this.serviceRepo.getStats()
  }
}
