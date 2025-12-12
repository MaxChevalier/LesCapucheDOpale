import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConsumablesService } from '../services/consumables.service';
import { CreateConsumableDto } from '../dto/create-consumable.dto';
import { UpdateConsumableDto } from '../dto/update-consumable.dto';
import { PurchaseConsumableDto } from '../dto/purchase-consumable.dto';
import { ApiTags, ApiParam, ApiBody, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Consumables')
@Controller('consumables')
export class ConsumablesController {
  constructor(private readonly consumablesService: ConsumablesService) {}

  @Post()
  create(@Body() dto: CreateConsumableDto) {
    return this.consumablesService.create(dto);
  }

  @Get()
  findAll() {
    return this.consumablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateConsumableDto) {
    return this.consumablesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumablesService.remove(+id);
  }

  @Post(':id/purchase')
  @ApiParam({ name: 'id', example: 1, description: 'Consumable ID' })
  @ApiBody({
    description: 'Quantité à acheter',
    required: true,
    schema: {
      type: 'object',
      properties: {
        quantity: {
          type: 'number',
          example: 3,
          description: 'Nombre de consommables à acheter',
        },
      },
      required: ['quantity'],
    },
  })
  @ApiOkResponse({
    description: 'Achat effectué avec succès',
    schema: {
      type: 'object',
      additionalProperties: true,
      example: {
        id: 1,
        name: 'Potion de soin',
        stock: 7,
        updatedAt: '2025-12-12T10:00:00.000Z',
      },
    },
  })
  purchase(@Param('id') id: string, @Body() dto: PurchaseConsumableDto) {
    return this.consumablesService.purchase(+id, dto.quantity);
  }
}
