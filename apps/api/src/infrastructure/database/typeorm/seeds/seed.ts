import 'reflect-metadata'
import { AppDataSource } from '../data-source'
import { UserOrmEntity } from '../entities/user.orm-entity'
import { ServiceOrmEntity } from '../entities/service.orm-entity'
import { TipoServico, StatusServico, FormaPagamento } from '@manager/domain'
import * as bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'

async function seed() {
  await AppDataSource.initialize()
  console.log('Database connected. Running seed...')

  const userRepo = AppDataSource.getRepository(UserOrmEntity)
  const serviceRepo = AppDataSource.getRepository(ServiceOrmEntity)

  // Seed admin user (idempotent)
  const existing = await userRepo.findOne({ where: { email: 'admin@example.com' } })
  if (!existing) {
    const admin = userRepo.create({
      id: uuid(),
      name: 'Admin',
      email: 'admin@example.com',
      passwordHash: await bcrypt.hash('admin123', 10),
    })
    await userRepo.save(admin)
    console.log('✓ Admin user created: admin@example.com / admin123')
  } else {
    console.log('✓ Admin user already exists, skipping')
  }

  // Seed services (idempotent by count)
  const count = await serviceRepo.count()
  if (count === 0) {
    const now = new Date().toISOString().split('T')[0]
    await serviceRepo.save([
      serviceRepo.create({
        id: uuid(),
        cliente: { id: 'cli-001', nome: 'Empresa ABC', email: 'contato@abc.com' },
        tipo: TipoServico.CONSULTORIA,
        status: StatusServico.EM_ANDAMENTO,
        data_inicio: now,
        valor_total: 5000,
        forma_pagamento: FormaPagamento.MENSAL,
      }),
      serviceRepo.create({
        id: uuid(),
        cliente: { id: 'cli-002', nome: 'Construtora XYZ', email: 'obra@xyz.com' },
        tipo: TipoServico.OBRA_INCENDIO,
        status: StatusServico.CONCLUIDO,
        data_inicio: '2026-01-10',
        data_fim: '2026-03-01',
        valor_total: 25000,
        forma_pagamento: FormaPagamento.PARCELADO,
      }),
      serviceRepo.create({
        id: uuid(),
        cliente: { id: 'cli-003', nome: 'Tech Corp', email: 'ti@techcorp.com' },
        tipo: TipoServico.PROJETO,
        status: StatusServico.PAUSADO,
        data_inicio: '2026-02-15',
        valor_total: 12000,
        forma_pagamento: FormaPagamento.A_VISTA,
      }),
    ])
    console.log('✓ 3 sample services created')
  } else {
    console.log(`✓ Services already seeded (${count} found), skipping`)
  }

  await AppDataSource.destroy()
  console.log('Seed complete.')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
