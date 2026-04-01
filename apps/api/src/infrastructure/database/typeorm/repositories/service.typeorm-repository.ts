import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Service, ServiceStats } from '../../../../domain/entities/service.entity'
import { IServiceRepository } from '../../../../domain/repositories/service.repository'
import { ServiceOrmEntity } from '../entities/service.orm-entity'
import {
  TipoServico,
  StatusServico,
  FormaPagamento,
} from '@manager/domain'

@Injectable()
export class ServiceTypeOrmRepository implements IServiceRepository {
  constructor(
    @InjectRepository(ServiceOrmEntity)
    private readonly repo: Repository<ServiceOrmEntity>,
  ) {}

  async findAll(): Promise<Service[]> {
    const orms = await this.repo.find({ order: { createdAt: 'DESC' } })
    return orms.map((o) => this.toDomain(o))
  }

  async findById(id: string): Promise<Service | null> {
    const orm = await this.repo.findOne({ where: { id } })
    return orm ? this.toDomain(orm) : null
  }

  async findByStatus(status: string): Promise<Service[]> {
    const orms = await this.repo.find({
      where: { status: status as StatusServico },
      order: { createdAt: 'DESC' },
    })
    return orms.map((o) => this.toDomain(o))
  }

  async findByClienteId(clienteId: string): Promise<Service[]> {
    const orms = await this.repo
      .createQueryBuilder('service')
      .where("service.cliente->>'id' = :clienteId", { clienteId })
      .orderBy('service.createdAt', 'DESC')
      .getMany()
    return orms.map((o) => this.toDomain(o))
  }

  async save(service: Service): Promise<Service> {
    const orm = this.toOrm(service)
    const saved = await this.repo.save(orm)
    return this.toDomain(saved)
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id)
  }

  async getStats(): Promise<ServiceStats> {
    const counts = await this.repo
      .createQueryBuilder('s')
      .select('s.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('s.status')
      .getRawMany<{ status: string; count: string }>()

    const map: Record<string, number> = {}
    let total = 0
    for (const row of counts) {
      map[row.status] = parseInt(row.count, 10)
      total += map[row.status]
    }

    return {
      total,
      em_andamento: map['EM_ANDAMENTO'] ?? 0,
      concluidos: map['CONCLUIDO'] ?? 0,
      pausados: map['PAUSADO'] ?? 0,
      cancelados: map['CANCELADO'] ?? 0,
    }
  }

  private toDomain(orm: ServiceOrmEntity): Service {
    return new Service(
      orm.id,
      orm.cliente,
      orm.tipo,
      orm.status,
      orm.data_inicio,
      Number(orm.valor_total),
      orm.forma_pagamento,
      orm.createdAt,
      orm.updatedAt,
      orm.data_fim ?? undefined,
      orm.cronograma ?? undefined,
      orm.pagamentos ?? undefined,
      orm.documentos ?? undefined,
      orm.custos_fixos ?? undefined,
      orm.parcelamento ?? undefined,
    )
  }

  private toOrm(service: Service): ServiceOrmEntity {
    const orm = new ServiceOrmEntity()
    orm.id = service.id
    orm.cliente = service.cliente
    orm.tipo = service.tipo as TipoServico
    orm.status = service.status as StatusServico
    orm.data_inicio = service.data_inicio
    orm.data_fim = service.data_fim ?? null
    orm.valor_total = service.valor_total
    orm.forma_pagamento = service.forma_pagamento as FormaPagamento
    orm.cronograma = service.cronograma ?? null
    orm.pagamentos = service.pagamentos ?? null
    orm.documentos = service.documentos ?? null
    orm.custos_fixos = service.custos_fixos ?? null
    orm.parcelamento = service.parcelamento ?? null
    return orm
  }
}
