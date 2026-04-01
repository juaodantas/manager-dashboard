import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/auth.guard'
import { CreateServiceUseCase } from '../../../application/use-cases/service/create-service.use-case'
import { GetServiceUseCase } from '../../../application/use-cases/service/get-service.use-case'
import { UpdateServiceUseCase } from '../../../application/use-cases/service/update-service.use-case'
import { DeleteServiceUseCase } from '../../../application/use-cases/service/delete-service.use-case'
import { CreateServiceHttpDto, UpdateServiceHttpDto } from './service.dto'

@ApiTags('services')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('services')
export class ServiceController {
  constructor(
    private readonly createService: CreateServiceUseCase,
    private readonly getService: GetServiceUseCase,
    private readonly updateService: UpdateServiceUseCase,
    private readonly deleteService: DeleteServiceUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create service' })
  create(@Body() dto: CreateServiceHttpDto) {
    return this.createService.execute(dto)
  }

  @Get()
  @ApiOperation({ summary: 'List services' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'clienteId', required: false })
  findAll(
    @Query('status') status?: string,
    @Query('clienteId') clienteId?: string,
  ) {
    if (status) return this.getService.getByStatus(status)
    if (clienteId) return this.getService.getByClienteId(clienteId)
    return this.getService.getAll()
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get service stats' })
  getStats() {
    return this.getService.getStats()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get service by ID' })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id') id: string) {
    return this.getService.getById(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update service' })
  update(@Param('id') id: string, @Body() dto: UpdateServiceHttpDto) {
    return this.updateService.execute(id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete service' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteService.execute(id)
  }
}
