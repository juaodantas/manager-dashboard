'use client'

import { StatusServico, TipoServico } from '@manager/domain'
import { Select } from '../ui/Select'

interface ServiceFiltersProps {
  status: string
  tipo: string
  onStatusChange: (value: string) => void
  onTipoChange: (value: string) => void
}

const statusOptions = [
  { value: StatusServico.ORCAMENTO, label: 'Orçamento' },
  { value: StatusServico.APROVADO, label: 'Aprovado' },
  { value: StatusServico.EM_ANDAMENTO, label: 'Em Andamento' },
  { value: StatusServico.CONCLUIDO, label: 'Concluído' },
  { value: StatusServico.CANCELADO, label: 'Cancelado' },
]

const tipoOptions = [
  { value: TipoServico.INSTALACAO, label: 'Instalação' },
  { value: TipoServico.MANUTENCAO, label: 'Manutenção' },
  { value: TipoServico.CONSULTORIA, label: 'Consultoria' },
  { value: TipoServico.OUTROS, label: 'Outros' },
]

export function ServiceFilters({ status, tipo, onStatusChange, onTipoChange }: ServiceFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-48">
        <Select
          label="Status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          options={statusOptions}
          placeholder="Todos os status"
        />
      </div>
      <div className="w-48">
        <Select
          label="Tipo"
          value={tipo}
          onChange={(e) => onTipoChange(e.target.value)}
          options={tipoOptions}
          placeholder="Todos os tipos"
        />
      </div>
    </div>
  )
}
