import { Inject, NotFoundException } from '@nestjs/common'
import { IUserRepository, USER_REPOSITORY } from '../../../domain/repositories/user.repository'

export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepo.findById(id)
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`)
    }
    await this.userRepo.delete(id)
  }
}
