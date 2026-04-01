import type { Service, ServiceStats } from '../entities/service.entity'
import type { CreateServiceDto, UpdateServiceDto } from '../../application/use-cases/service/service.types'

export interface IServiceRepository {
  findAll(params?: { status?: string; clienteId?: string }): Promise<{ servicos: Service[]; count: number }>
  findById(id: string): Promise<Service>
  getStats(): Promise<ServiceStats>
  create(data: CreateServiceDto): Promise<Service>
  update(id: string, data: UpdateServiceDto): Promise<Service>
  delete(id: string): Promise<void>
}
