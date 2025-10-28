import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsumablesService } from '../services/consumables.service';
import { CreateConsumableDto } from '../dto/create-consumable.dto';
import { UpdateConsumableDto } from '../dto/update-consumable.dto';

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
}
