import { ConflictException, NotFoundException } from '@nestjs/common';
import { AdventurersService } from '../services/adventurers.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AdventurersService', () => {
    let service: AdventurersService;
    let prisma: PrismaService;

    beforeEach(() => {
        prisma = {
            adventurer: {
                findFirst: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            },
            specialty: {
                findFirst: jest.fn(),
            },
            equipmentType: {
                findFirst: jest.fn(),
            },
            consumableType: {
                findFirst: jest.fn(),
            },
        } as any;

        service = new AdventurersService(prisma);
    });

    afterEach(() => jest.clearAllMocks());

    // ------------------------
    // CREATE
    // ------------------------
    it('should create a new adventurer', async () => {
        (prisma.adventurer.findFirst as jest.Mock).mockResolvedValue(null);
        (prisma.specialty.findFirst as jest.Mock).mockResolvedValue({ id: 1, name: 'Warrior' });
        (prisma.equipmentType.findFirst as jest.Mock).mockResolvedValue({ id: 1, name: 'Sword' });
        (prisma.consumableType.findFirst as jest.Mock).mockResolvedValue({ id: 1, name: 'Potion' });
        (prisma.adventurer.create as jest.Mock).mockResolvedValue({
            id: 1,
            name: 'Aragorn',
            specialty: { id: 1, name: 'Warrior' },
            equipmentTypes: [{ id: 1, name: 'Sword' }],
            consumableTypes: [{ id: 1, name: 'Potion' }],
        });

        const result = await service.create({
            name: 'Aragorn',
            specialty: { name: 'Warrior' },
            dailyRate: 100,
            experience: 5,
            equipmentTypes: [{ name: 'Sword' }],
            consumableTypes: [{ name: 'Potion' }],
        });

        expect(result).toEqual({
            id: 1,
            name: 'Aragorn',
            specialty: { id: 1, name: 'Warrior' },
            equipmentTypes: [{ id: 1, name: 'Sword' }],
            consumableTypes: [{ id: 1, name: 'Potion' }],
        });
    });

    it('should throw ConflictException if name already exists', async () => {
        (prisma.adventurer.findFirst as jest.Mock).mockResolvedValue({ id: 1, name: 'Aragorn' });

        await expect(
            service.create({
                name: 'Aragorn',
                specialty: { name: 'Warrior' },
                dailyRate: 100,
                experience: 5,
                equipmentTypes: [],
                consumableTypes: [],
            }),
        ).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException if specialty not found', async () => {
        (prisma.adventurer.findFirst as jest.Mock).mockResolvedValue(null);
        (prisma.specialty.findFirst as jest.Mock).mockResolvedValue(null);

        await expect(
            service.create({
                name: 'Aragorn',
                specialty: { name: 'Unknown' },
                dailyRate: 100,
                experience: 5,
                equipmentTypes: [],
                consumableTypes: [],
            }),
        ).rejects.toThrow(NotFoundException);
    });

    // ------------------------
    // UPDATE
    // ------------------------
    it('should update an adventurer', async () => {
        (prisma.specialty.findFirst as jest.Mock).mockResolvedValue({ id: 1, name: 'Warrior' });
        (prisma.equipmentType.findFirst as jest.Mock).mockResolvedValue({ id: 1, name: 'Sword' });
        (prisma.consumableType.findFirst as jest.Mock).mockResolvedValue({ id: 1, name: 'Potion' });
        const updated = { id: 1, name: 'Updated' };
        (prisma.adventurer.update as jest.Mock).mockResolvedValue(updated);

        const result = await service.update(1, { name: 'Updated' });
        expect(result).toEqual(updated);
    });

    it('should throw NotFoundException if updating non-existent adventurer', async () => {
        (prisma.adventurer.update as jest.Mock).mockRejectedValue({ code: 'P2025' });
        await expect(service.update(999, { name: 'Ghost' })).rejects.toThrow(NotFoundException);
    });
});
