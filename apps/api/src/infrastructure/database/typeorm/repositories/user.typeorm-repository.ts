import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../../../domain/entities/user.entity'
import { IUserRepository } from '../../../../domain/repositories/user.repository'
import { Email } from '@manager/domain'
import { UserOrmEntity } from '../entities/user.orm-entity'

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const orm = await this.repo.findOne({ where: { id } })
    return orm ? this.toDomain(orm) : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const orm = await this.repo.findOne({ where: { email } })
    return orm ? this.toDomain(orm) : null
  }

  async findAll(): Promise<User[]> {
    const orms = await this.repo.find({ order: { createdAt: 'DESC' } })
    return orms.map((o) => this.toDomain(o))
  }

  async save(user: User): Promise<User> {
    const orm = this.toOrm(user)
    const saved = await this.repo.save(orm)
    return this.toDomain(saved)
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id)
  }

  private toDomain(orm: UserOrmEntity): User {
    return new User(
      orm.id,
      orm.name,
      new Email(orm.email),
      orm.passwordHash,
      orm.createdAt,
      orm.updatedAt,
    )
  }

  private toOrm(user: User): UserOrmEntity {
    const orm = new UserOrmEntity()
    orm.id = user.id
    orm.name = user.name
    orm.email = user.email.value
    orm.passwordHash = user.passwordHash
    orm.createdAt = user.createdAt
    orm.updatedAt = user.updatedAt
    return orm
  }
}
