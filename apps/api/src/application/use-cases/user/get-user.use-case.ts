import { Inject, NotFoundException } from '@nestjs/common'
import { User } from '../../../domain/entities/user.entity'
import { IUserRepository, USER_REPOSITORY } from '../../../domain/repositories/user.repository'

export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepo.findAll()
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepo.findById(id)
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`)
    }
    return user
  }
}
