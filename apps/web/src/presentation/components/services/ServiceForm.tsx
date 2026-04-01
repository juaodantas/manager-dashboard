'use client'

import { useState } from 'react'
import type { Service } from '@manager/domain'
import { StatusServico, TipoServico, FormaPagamento } from '@manager/domain'
import type { CreateServiceDto, UpdateServiceDto } from '../../../application/use-cases/service/service.types'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

interface ServiceFormProps {
  initial?: Service
  onSubmit: (data: CreateServiceDto | UpdateServiceDto) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

const tipoOptions = [
  { value: TipoServico.INSTALACAO, label: 'Instalação' },
  { value: TipoServico.MANUTENCAO, label: 'Manutenção' },
  { value: TipoServico.CONSULTORIA, label: 'Consultoria' },
  { value: TipoServico.OUTROS, label: 'Outros' },
]

const statusOptions = [
  { value: StatusServico.ORCAMENTO, label: 'Orçamento' },
  { value: StatusServico.APROVADO, label: 'Aprovado' },
  { value: StatusServico.EM_ANDAMENTO, label: 'Em Andamento' },
  { value: StatusServico.CONCLUIDO, label: 'Concluído' },
  { value: StatusServico.CANCELADO, label: 'Cancelado' },
]

const formaPagamentoOptions = [
  { value: FormaPagamento.PIX, label: 'PIX' },
  { value: FormaPagamento.BOLETO, label: 'Boleto' },
  { value: FormaPagamento.CARTAO_CREDITO, label: 'Cartão de Crédito' },
  { value: FormaPagamento.TRANSFERENCIA, label: 'Transferência' },
  { value: FormaPagamento.DINHEIRO, label: 'Dinheiro' },
]

export function ServiceForm({ initial, onSubmit, onCancel, loading }: ServiceFormProps) {
  const [form, setForm] = useState({
    clienteNome: initial?.cliente.nome ?? '',
    clienteEmail: initial?.cliente.email ?? '',
    clienteTelefone: initial?.cliente.telefone ?? '',
    tipo: initial?.tipo ?? TipoServico.INSTALACAO,
    status: initial?.status ?? StatusServico.ORCAMENTO,
    descricao: initial?.descricao ?? '',
    valor_total: initial?.valor_total ?? 0,
    forma_pagamento: initial?.forma_pagamento ?? FormaPagamento.PIX,
  })

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload: CreateServiceDto | UpdateServiceDto = {
      cliente: {
        nome: form.clienteNome,
        email: form.clienteEmail,
        telefone: form.clienteTelefone,
      },
      tipo: form.tipo as TipoServico,
      status: form.status as StatusServico,
      descricao: form.descricao,
      valor_total: Number(form.valor_total),
      forma_pagamento: form.forma_pagamento as FormaPagamento,
    }
    await onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Nome do Cliente" value={form.clienteNome} onChange={set('clienteNome')} required />
        <Input label="Email do Cliente" type="email" value={form.clienteEmail} onChange={set('clienteEmail')} required />
      </div>
      <Input label="Telefone do Cliente" value={form.clienteTelefone} onChange={set('clienteTelefone')} />
      <div className="grid grid-cols-2 gap-4">
        <Select label="Tipo" value={form.tipo} onChange={set('tipo')} options={tipoOptions} />
        <Select label="Status" value={form.status} onChange={set('status')} options={statusOptions} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          value={form.descricao}
          onChange={set('descricao')}
          rows={3}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Valor Total (R$)"
          type="number"
          min="0"
          step="0.01"
          value={form.valor_total}
          onChange={set('valor_total')}
          required
        />
        <Select
          label="Forma de Pagamento"
          value={form.forma_pagamento}
          onChange={set('forma_pagamento')}
          options={formaPagamentoOptions}
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>
          {initial ? 'Salvar' : 'Criar Serviço'}
        </Button>
      </div>
    </form>
  )
}
