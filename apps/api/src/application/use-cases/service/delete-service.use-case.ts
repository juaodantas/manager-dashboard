import { Inject, NotFoundException } from '@nestjs/common'
import { IServiceRepository, SERVICE_REPOSITORY } from '../../../domain/repositories/service.repository'

export class DeleteServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY) private readonly serviceRepo: IServiceRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const service = await this.serviceRepo.findById(id)
    if (!service) {
      throw new NotFoundException(`Service with id "${id}" not found`)
    }
    await this.serviceRepo.delete(id)
  }
}
