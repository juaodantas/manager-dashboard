import { Inject, NotFoundException } from '@nestjs/common'
import { Service } from '../../../domain/entities/service.entity'
import { IServiceRepository, SERVICE_REPOSITORY } from '../../../domain/repositories/service.repository'
import { CreateServiceDto } from './create-service.use-case'

export type UpdateServiceDto = Partial<Omit<CreateServiceDto, 'cliente'>> & {
  cliente?: CreateServiceDto['cliente']
}

export class UpdateServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY) private readonly serviceRepo: IServiceRepository,
  ) {}

  async execute(id: string, dto: UpdateServiceDto): Promise<Service> {
    const service = await this.serviceRepo.findById(id)
    if (!service) {
      throw new NotFoundException(`Service with id "${id}" not found`)
    }

    if (dto.cliente !== undefined) service.cliente = dto.cliente
    if (dto.tipo !== undefined) service.tipo = dto.tipo
    if (dto.status !== undefined) service.status = dto.status
    if (dto.data_inicio !== undefined) service.data_inicio = dto.data_inicio
    if (dto.data_fim !== undefined) service.data_fim = dto.data_fim
    if (dto.valor_total !== undefined) service.valor_total = dto.valor_total
    if (dto.forma_pagamento !== undefined) service.forma_pagamento = dto.forma_pagamento
    if (dto.cronograma !== undefined) service.cronograma = dto.cronograma
    if (dto.pagamentos !== undefined) service.pagamentos = dto.pagamentos
    if (dto.documentos !== undefined) service.documentos = dto.documentos
    if (dto.custos_fixos !== undefined) service.custos_fixos = dto.custos_fixos
    if (dto.parcelamento !== undefined) service.parcelamento = dto.parcelamento

    service.updatedAt = new Date()

    return this.serviceRepo.save(service)
  }
}
