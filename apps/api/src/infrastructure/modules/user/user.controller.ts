import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/auth.guard'
import { CreateUserUseCase } from '../../../application/use-cases/user/create-user.use-case'
import { GetUserUseCase } from '../../../application/use-cases/user/get-user.use-case'
import { UpdateUserUseCase } from '../../../application/use-cases/user/update-user.use-case'
import { DeleteUserUseCase } from '../../../application/use-cases/user/delete-user.use-case'
import { CreateUserHttpDto, UpdateUserHttpDto } from './user.dto'

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  async create(@Body() dto: CreateUserHttpDto) {
    const user = await this.createUser.execute(dto)
    return user.toJSON()
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  async findAll() {
    const users = await this.getUser.getAll()
    return users.map((u) => u.toJSON())
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    const user = await this.getUser.getById(id)
    return user.toJSON()
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  async update(@Param('id') id: string, @Body() dto: UpdateUserHttpDto) {
    const user = await this.updateUser.execute(id, dto)
    return user.toJSON()
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteUser.execute(id)
  }
}
