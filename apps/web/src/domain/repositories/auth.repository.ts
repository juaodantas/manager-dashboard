export interface IAuthRepository {
  login(email: string, password: string): Promise<{ access_token: string }>
  register(name: string, email: string, password: string): Promise<{ access_token: string }>
}
