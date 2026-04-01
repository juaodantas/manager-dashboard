import type { IAuthTokenPort } from '../../ports/auth-token.port'

export class LogoutUseCase {
  constructor(private readonly tokenPort: IAuthTokenPort) {}

  execute(): void {
    this.tokenPort.clear()
  }
}
