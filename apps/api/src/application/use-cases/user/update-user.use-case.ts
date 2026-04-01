import { Inject, NotFoundException } from '@nestjs/common'
import { User } from '../../../domain/entities/user.entity'
import { IUserRepository, USER_REPOSITORY } from '../../../domain/repositories/user.repository'
import { IAuthPort, AUTH_PORT } from '../../ports/auth.port'

export interface UpdateUserDto {
  name?: string
  password?: string
}

export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
    @Inject(AUTH_PORT) private readonly authPort: IAuthPort,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findById(id)
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`)
    }

    if (dto.name) {
      user.updateProfile(dto.name)
    }

    if (dto.password) {
      user.passwordHash = await this.authPort.hashPassword(dto.password)
      user.updatedAt = new Date()
    }

    return this.userRepo.save(user)
  }
}
