'use client'

import { useState } from 'react'
import type { Service } from '@manager/domain'
import { Button } from '../../../presentation/components/ui/Button'
import { Modal } from '../../../presentation/components/ui/Modal'
import { ServiceTable } from '../../../presentation/components/services/ServiceTable'
import { ServiceFilters } from '../../../presentation/components/services/ServiceFilters'
import { ServiceForm } from '../../../presentation/components/services/ServiceForm'
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from '../../../presentation/hooks/useServices'
import type { CreateServiceDto, UpdateServiceDto } from '../../../application/use-cases/service/service.types'

export default function ServicesPage() {
  const [statusFilter, setStatusFilter] = useState('')
  const [tipoFilter, setTipoFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Service | undefined>()

  const { data, isLoading } = useServices(statusFilter ? { status: statusFilter } : undefined)
  const createService = useCreateService()
  const updateService = useUpdateService()
  const deleteService = useDeleteService()

  const services = data?.servicos ?? []
  const filtered = tipoFilter ? services.filter((s) => s.tipo === tipoFilter) : services

  const handleSubmit = async (dto: CreateServiceDto | UpdateServiceDto) => {
    if (editing) {
      await updateService.mutateAsync({ id: editing.id, dto: dto as UpdateServiceDto })
    } else {
      await createService.mutateAsync(dto as CreateServiceDto)
    }
    setModalOpen(false)
    setEditing(undefined)
  }

  const handleEdit = (service: Service) => {
    setEditing(service)
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Confirma a exclusão do serviço?')) return
    await deleteService.mutateAsync(id)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditing(undefined)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Serviços</h1>
        <Button onClick={() => setModalOpen(true)}>Novo Serviço</Button>
      </div>

      <ServiceFilters
        status={statusFilter}
        tipo={tipoFilter}
        onStatusChange={setStatusFilter}
        onTipoChange={setTipoFilter}
      />

      {isLoading ? (
        <div className="py-12 text-center text-gray-500">Carregando...</div>
      ) : (
        <ServiceTable services={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <Modal
        open={modalOpen}
        title={editing ? 'Editar Serviço' : 'Novo Serviço'}
        onClose={handleCloseModal}
      >
        <ServiceForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          loading={createService.isPending || updateService.isPending}
        />
      </Modal>
    </div>
  )
}
