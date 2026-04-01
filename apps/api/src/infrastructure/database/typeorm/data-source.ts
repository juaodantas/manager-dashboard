import { DataSource } from 'typeorm'
import { UserOrmEntity } from './entities/user.orm-entity'
import { ServiceOrmEntity } from './entities/service.orm-entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  entities: [UserOrmEntity, ServiceOrmEntity],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
})
