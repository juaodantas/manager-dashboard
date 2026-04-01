import {
  IsString,
  IsEmail,
  IsNumber,
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator'
import { Type } from 'class-transformer'
import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  TipoServico,
  StatusServico,
  StatusCronograma,
  StatusPagamento,
  TipoDocumento,
  CategoriaCusto,
  FormaPagamento,
} from '@manager/domain'

export class ClienteDto {
  @ApiProperty() @IsString() id: string
  @ApiProperty() @IsString() nome: string
  @ApiProperty() @IsEmail() email: string
}

export class CronogramaDto {
  @ApiPropertyOptional() @IsOptional() @IsString() id?: string
  @ApiProperty() @IsString() descricao: string
  @ApiProperty() @IsDateString() data_prevista: string
  @ApiPropertyOptional() @IsOptional() @IsDateString() data_realizada?: string
  @ApiProperty({ enum: StatusCronograma }) @IsEnum(StatusCronograma) status: StatusCronograma
}

export class PagamentoDto {
  @ApiPropertyOptional() @IsOptional() @IsString() id?: string
  @ApiProperty() @IsNumber() valor: number
  @ApiProperty() @IsDateString() data_vencimento: string
  @ApiPropertyOptional() @IsOptional() @IsDateString() data_pagamento?: string
  @ApiProperty({ enum: StatusPagamento }) @IsEnum(StatusPagamento) status: StatusPagamento
}

export class DocumentoDto {
  @ApiPropertyOptional() @IsOptional() @IsString() id?: string
  @ApiProperty() @IsString() nome: string
  @ApiProperty() @IsString() url: string
  @ApiProperty({ enum: TipoDocumento }) @IsEnum(TipoDocumento) tipo: TipoDocumento
  @ApiProperty() @IsDateString() data_upload: string
}

export class CustoFixoDto {
  @ApiPropertyOptional() @IsOptional() @IsString() id?: string
  @ApiProperty() @IsString() descricao: string
  @ApiProperty() @IsNumber() valor: number
  @ApiProperty({ enum: CategoriaCusto }) @IsEnum(CategoriaCusto) categoria: CategoriaCusto
}

export class ParcelamentoDto {
  @ApiPropertyOptional() @IsOptional() @IsString() id?: string
  @ApiProperty() @IsNumber() numero_parcela: number
  @ApiProperty() @IsNumber() valor: number
  @ApiProperty() @IsDateString() data_vencimento: string
  @ApiPropertyOptional() @IsOptional() @IsDateString() data_pagamento?: string
  @ApiProperty({ enum: StatusPagamento }) @IsEnum(StatusPagamento) status: StatusPagamento
}

export class CreateServiceHttpDto {
  @ApiProperty() @ValidateNested() @Type(() => ClienteDto) cliente: ClienteDto
  @ApiProperty({ enum: TipoServico }) @IsEnum(TipoServico) tipo: TipoServico
  @ApiProperty() @IsDateString() data_inicio: string
  @ApiPropertyOptional() @IsOptional() @IsDateString() data_fim?: string
  @ApiProperty({ enum: StatusServico }) @IsEnum(StatusServico) status: StatusServico
  @ApiPropertyOptional({ type: [CronogramaDto] }) @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => CronogramaDto) cronograma?: CronogramaDto[]
  @ApiPropertyOptional({ type: [PagamentoDto] }) @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => PagamentoDto) pagamentos?: PagamentoDto[]
  @ApiPropertyOptional({ type: [DocumentoDto] }) @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => DocumentoDto) documentos?: DocumentoDto[]
  @ApiPropertyOptional({ type: [CustoFixoDto] }) @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => CustoFixoDto) custos_fixos?: CustoFixoDto[]
  @ApiProperty() @IsNumber() valor_total: number
  @ApiProperty({ enum: FormaPagamento }) @IsEnum(FormaPagamento) forma_pagamento: FormaPagamento
  @ApiPropertyOptional({ type: [ParcelamentoDto] }) @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => ParcelamentoDto) parcelamento?: ParcelamentoDto[]
}

export class UpdateServiceHttpDto extends PartialType(CreateServiceHttpDto) {}
