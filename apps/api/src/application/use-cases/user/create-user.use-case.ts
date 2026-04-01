import { Inject, ConflictException } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { User } from '../../../domain/entities/user.entity'
import { IUserRepository, USER_REPOSITORY } from '../../../domain/repositories/user.repository'
import { IAuthPort, AUTH_PORT } from '../../ports/auth.port'
import { Email } from '@manager/domain'

export interface CreateUserDto {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
    @Inject(AUTH_PORT) private readonly authPort: IAuthPort,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepo.findByEmail(dto.email)
    if (existing) {
      throw new ConflictException('Email already in use')
    }

    const passwordHash = await this.authPort.hashPassword(dto.password)
    const now = new Date()
    const user = new User(
      uuid(),
      dto.name,
      new Email(dto.email),
      passwordHash,
      now,
      now,
    )

    return this.userRepo.save(user)
  }
}
