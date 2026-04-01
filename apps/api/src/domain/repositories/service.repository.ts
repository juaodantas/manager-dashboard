import { Service, ServiceStats } from '../entities/service.entity'

export interface IServiceRepository {
  findAll(): Promise<Service[]>
  findById(id: string): Promise<Service | null>
  findByStatus(status: string): Promise<Service[]>
  findByClienteId(clienteId: string): Promise<Service[]>
  save(service: Service): Promise<Service>
  delete(id: string): Promise<void>
  getStats(): Promise<ServiceStats>
}

export const SERVICE_REPOSITORY = Symbol('SERVICE_REPOSITORY')
