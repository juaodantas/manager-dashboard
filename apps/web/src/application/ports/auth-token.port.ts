export interface IAuthTokenPort {
  getToken(): string | null
  setToken(token: string): void
  clear(): void
}
