import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import {
  TipoServico,
  StatusServico,
  FormaPagamento,
  ClienteInfo,
  CronogramaItem,
  PagamentoItem,
  DocumentoItem,
  CustoFixoItem,
  ParcelamentoItem,
} from '@manager/domain'

@Entity('services')
export class ServiceOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'jsonb', name: 'cliente' })
  cliente: ClienteInfo

  @Column({ type: 'enum', enum: TipoServico })
  tipo: TipoServico

  @Column({ type: 'enum', enum: StatusServico })
  status: StatusServico

  @Column({ name: 'data_inicio', type: 'date' })
  data_inicio: string

  @Column({ name: 'data_fim', type: 'date', nullable: true })
  data_fim: string | null

  @Column({ name: 'valor_total', type: 'decimal', precision: 10, scale: 2 })
  valor_total: number

  @Column({ name: 'forma_pagamento', type: 'enum', enum: FormaPagamento })
  forma_pagamento: FormaPagamento

  @Column({ type: 'jsonb', nullable: true })
  cronograma: CronogramaItem[] | null

  @Column({ type: 'jsonb', nullable: true })
  pagamentos: PagamentoItem[] | null

  @Column({ type: 'jsonb', nullable: true })
  documentos: DocumentoItem[] | null

  @Column({ type: 'jsonb', name: 'custos_fixos', nullable: true })
  custos_fixos: CustoFixoItem[] | null

  @Column({ type: 'jsonb', nullable: true })
  parcelamento: ParcelamentoItem[] | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
