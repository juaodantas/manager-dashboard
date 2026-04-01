import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

export interface JwtPayload {
  sub: string
  email: string
  iat: number
  exp: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'changeme',
    })
  }

  validate(payload: JwtPayload): { id: string; email: string } {
    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException()
    }
    return { id: payload.sub, email: payload.email }
  }
}
