import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConsumableDto } from '../dto/create-consumable.dto';
import { UpdateConsumableDto } from '../dto/update-consumable.dto';

@Injectable()
export class ConsumablesService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateConsumableDto) {
        return this.prisma.consumable.create({
            data: dto,
            include: { consumableType: true },
        });
    }

    async findAll() {
        return this.prisma.consumable.findMany({
            include: { consumableType: true },
        });
    }

    async findOne(id: number) {
        const consumable = await this.prisma.consumable.findUnique({
            where: { id },
            include: { consumableType: true },
        });
        if (!consumable) throw new NotFoundException('Consumable not found');
        return consumable;
    }

    async update(id: number, dto: UpdateConsumableDto) {
        try {
            return await this.prisma.consumable.update({
                where: { id },
                data: dto,
                include: { consumableType: true },
            });
        } catch (e: any) {
            if (e.code === 'P2025') throw new NotFoundException('Consumable not found');
            throw e;
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.consumable.delete({ where: { id } });
        } catch (e: any) {
            if (e.code === 'P2025') throw new NotFoundException('Consumable not found');
            throw e;
        }
    }
}
