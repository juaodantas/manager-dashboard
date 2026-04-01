import { Inject } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import {
  Service,
  TipoServico,
  StatusServico,
  FormaPagamento,
  ClienteInfo,
  CronogramaItem,
  PagamentoItem,
  DocumentoItem,
  CustoFixoItem,
  ParcelamentoItem,
} from '../../../domain/entities/service.entity'
import { IServiceRepository, SERVICE_REPOSITORY } from '../../../domain/repositories/service.repository'

export interface CreateServiceDto {
  cliente: ClienteInfo
  tipo: TipoServico
  status: StatusServico
  data_inicio: string
  data_fim?: string
  valor_total: number
  forma_pagamento: FormaPagamento
  cronograma?: CronogramaItem[]
  pagamentos?: PagamentoItem[]
  documentos?: DocumentoItem[]
  custos_fixos?: CustoFixoItem[]
  parcelamento?: ParcelamentoItem[]
}

function ensureIds<T extends { id?: string }>(
  items: T[] | undefined,
  prefix: string,
): T[] | undefined {
  if (!items) return undefined
  return items.map((item) => ({
    ...item,
    id: item.id || `${prefix}-${uuid().slice(0, 8)}`,
  }))
}

export class CreateServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY) private readonly serviceRepo: IServiceRepository,
  ) {}

  async execute(dto: CreateServiceDto): Promise<Service> {
    const now = new Date()
    const service = new Service(
      uuid(),
      dto.cliente,
      dto.tipo,
      dto.status,
      dto.data_inicio,
      dto.valor_total,
      dto.forma_pagamento,
      now,
      now,
      dto.data_fim,
      ensureIds(dto.cronograma, 'crn'),
      ensureIds(dto.pagamentos, 'pgt'),
      ensureIds(dto.documentos, 'doc'),
      ensureIds(dto.custos_fixos, 'cst'),
      ensureIds(dto.parcelamento, 'prc'),
    )
    return this.serviceRepo.save(service)
  }
}
