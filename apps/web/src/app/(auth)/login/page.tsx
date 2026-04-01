'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../../presentation/contexts/auth.context'
import { Input } from '../../../presentation/components/ui/Input'
import { Button } from '../../../presentation/components/ui/Button'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
    } catch {
      setError('Email ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Entrar</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" loading={loading} className="mt-2 w-full">
            Entrar
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem conta?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}
