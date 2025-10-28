import { NotFoundException } from '@nestjs/common';
import { ConsumablesService } from '../services/consumables.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ConsumablesService', () => {
    let service: ConsumablesService;
    let prisma: PrismaService;

    beforeEach(() => {
        prisma = {
            consumable: {
                create: jest.fn(),
                findMany: jest.fn(),
                findUnique: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
        } as unknown as PrismaService;

        service = new ConsumablesService(prisma);
    });

    // CREATE
    it('should create a consumable', async () => {
        const dto = { name: 'Potion', consumableTypeId: 1, quantity: 10, cost: 25 };
        (prisma.consumable.create as jest.Mock).mockResolvedValue({ id: 1, ...dto });

        const res = await service.create(dto as any);
        expect(prisma.consumable.create).toHaveBeenCalledWith({
            data: dto,
            include: { consumableType: true },
        });
        expect(res).toEqual({ id: 1, ...dto });
    });

    // FIND ALL
    it('should return all consumables', async () => {
        (prisma.consumable.findMany as jest.Mock).mockResolvedValue([{ id: 1 }]);

        const res = await service.findAll();
        expect(prisma.consumable.findMany).toHaveBeenCalledWith({
            include: { consumableType: true },
        });
        expect(res).toEqual([{ id: 1 }]);
    });

    // FIND ONE
    it('should return a consumable by id', async () => {
        (prisma.consumable.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
        const res = await service.findOne(1);
        expect(prisma.consumable.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: { consumableType: true },
        });
        expect(res).toEqual({ id: 1 });
    });

    it('should throw NotFoundException when consumable not found', async () => {
        (prisma.consumable.findUnique as jest.Mock).mockResolvedValue(null);
        await expect(service.findOne(42)).rejects.toThrow(NotFoundException);
    });

    // UPDATE
    it('should update a consumable', async () => {
        (prisma.consumable.update as jest.Mock).mockResolvedValue({ id: 1, name: 'Up' });

        const res = await service.update(1, { name: 'Up' });
        expect(prisma.consumable.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { name: 'Up' },
            include: { consumableType: true },
        });
        expect(res).toEqual({ id: 1, name: 'Up' });
    });

    it('should map P2025 to NotFound on update', async () => {
        (prisma.consumable.update as jest.Mock).mockRejectedValue({ code: 'P2025' });
        await expect(service.update(999, { name: 'X' })).rejects.toThrow(NotFoundException);
    });

    // REMOVE
    it('should delete a consumable', async () => {
        (prisma.consumable.delete as jest.Mock).mockResolvedValue({ id: 1 });

        const res = await service.remove(1);
        expect(prisma.consumable.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(res).toEqual({ id: 1 });
    });

    it('should map P2025 to NotFound on delete', async () => {
        (prisma.consumable.delete as jest.Mock).mockRejectedValue({ code: 'P2025' });
        await expect(service.remove(123)).rejects.toThrow(NotFoundException);
    });
});
