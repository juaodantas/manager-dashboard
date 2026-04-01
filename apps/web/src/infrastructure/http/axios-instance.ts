import axios from 'axios'
import type { IAuthTokenPort } from '../../application/ports/auth-token.port'

export function createAxiosInstance(tokenPort: IAuthTokenPort) {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
    timeout: 10000,
  })

  instance.interceptors.request.use((config) => {
    const token = tokenPort.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 && typeof window !== 'undefined') {
        tokenPort.clear()
        window.location.href = '/login'
      }
      return Promise.reject(error)
    },
  )

  return instance
}
