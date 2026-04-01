// Entities
export { User, type UserProps } from './entities/user.entity'
export {
  Service,
  TipoServico,
  StatusServico,
  StatusCronograma,
  StatusPagamento,
  TipoDocumento,
  CategoriaCusto,
  FormaPagamento,
  type ClienteInfo,
  type CronogramaItem,
  type PagamentoItem,
  type DocumentoItem,
  type CustoFixoItem,
  type ParcelamentoItem,
  type ServiceStats,
} from './entities/service.entity'

// Value Objects
export { Email } from './value-objects/email.vo'

// Exceptions
export {
  DomainException,
  InvalidEmailException,
  EntityNotFoundException,
  DuplicateEmailException,
} from './exceptions/domain.exception'
