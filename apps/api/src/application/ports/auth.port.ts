export interface IAuthPort {
  hashPassword(password: string): Promise<string>
  comparePasswords(plain: string, hash: string): Promise<boolean>
  generateToken(payload: { sub: string; email: string }): string
}

export const AUTH_PORT = Symbol('AUTH_PORT')
