import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { LoginDto, RegisterDto } from './auth.dto'
import { AuthService } from './auth.service'
import { IUserRepository, USER_REPOSITORY } from '../../../domain/repositories/user.repository'
import { CreateUserUseCase } from '../../../application/use-cases/user/create-user.use-case'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User registered, returns JWT' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  async register(@Body() dto: RegisterDto): Promise<{ access_token: string }> {
    const user = await this.createUserUseCase.execute(dto)
    const access_token = this.authService.generateToken({
      sub: user.id,
      email: user.email.value,
    })
    return { access_token }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, description: 'Returns JWT access token' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepo.findByEmail(dto.email)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const valid = await this.authService.comparePasswords(
      dto.password,
      user.passwordHash,
    )
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const access_token = this.authService.generateToken({
      sub: user.id,
      email: user.email.value,
    })
    return { access_token }
  }
}
