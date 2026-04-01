import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { IAuthPort } from '../../../application/ports/auth.port'

@Injectable()
export class AuthService implements IAuthPort {
  constructor(private readonly jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  async comparePasswords(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash)
  }

  generateToken(payload: { sub: string; email: string }): string {
    return this.jwtService.sign(payload)
  }
}
