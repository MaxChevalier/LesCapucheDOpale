import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAdventurerDto } from "../dto/create-adventurer.dto";
import { UpdateAdventurerDto } from "../dto/update-adventurer.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class AdventurersService {
    constructor(private prisma: PrismaService) {}

    async create(createAdventurerDto: CreateAdventurerDto) {
        const exists = await this.prisma.adventurer.findFirst({ where: { name: createAdventurerDto.name } });
        if (exists) {
            throw new ConflictException('Adventurer name already exists');
        }

        const {
            name,
            specialty,
            dailyRate,
            experience,
            equipmentTypes,
            consumableTypes,
        } = createAdventurerDto;

        // Find existing specialty
        const specialtyEntity = await this.prisma.specialty.findFirst({ where: { name: specialty.name } });
        if (!specialtyEntity) {
            throw new NotFoundException('Specialty not found');
        }

        // Find existing equipment types
        const equipmentTypeEntities = await Promise.all(
            equipmentTypes.map(async (et) => {
                const entity = await this.prisma.equipmentType.findFirst({ where: { name: et.name } });
                if (!entity) {
                    throw new NotFoundException(`EquipmentType '${et.name}' not found`);
                }
                return entity;
            })
        );

        // Find existing consumable types
        const consumableTypeEntities = await Promise.all(
            consumableTypes.map(async (ct) => {
                const entity = await this.prisma.consumableType.findFirst({ where: { name: ct.name } });
                if (!entity) {
                    throw new NotFoundException(`ConsumableType '${ct.name}' not found`);
                }
                return entity;
            })
        );

        return this.prisma.adventurer.create({
            data: {
                name,
                specialtyId: specialtyEntity.id,
                dailyRate,
                experience,
                equipmentTypes: equipmentTypeEntities.length
                    ? { connect: equipmentTypeEntities.map(et => ({ id: et.id })) }
                    : undefined,
                consumableTypes: consumableTypeEntities.length
                    ? { connect: consumableTypeEntities.map(ct => ({ id: ct.id })) }
                    : undefined,
            },
            include: {
                specialty: true,
                equipmentTypes: true,
                consumableTypes: true,
            },
        });
    }

    async update(id: number, dto: UpdateAdventurerDto) {
        const {
            specialty,
            equipmentTypes,
            consumableTypes,
            ...scalars
        } = dto;

        let specialtyId: number | undefined;
        if (specialty) {
            let specialtyEntity = await this.prisma.specialty.findFirst({ where: { name: specialty.name } });
            if (!specialtyEntity) {
                specialtyEntity = await this.prisma.specialty.create({ data: { name: specialty.name } });
            }
            specialtyId = specialtyEntity.id;
        }

        let equipmentTypeIds: { id: number }[] | undefined;
        if (equipmentTypes) {
            const entities = await Promise.all(
                equipmentTypes.map(async (et) => {
                    let entity = await this.prisma.equipmentType.findFirst({ where: { name: et.name } });
                    if (!entity) {
                        entity = await this.prisma.equipmentType.create({ data: { name: et.name } });
                    }
                    return entity;
                })
            );
            equipmentTypeIds = entities.map(et => ({ id: et.id }));
        }

        let consumableTypeIds: { id: number }[] | undefined;
        if (consumableTypes) {
            const entities = await Promise.all(
                consumableTypes.map(async (ct) => {
                    let entity = await this.prisma.consumableType.findFirst({ where: { name: ct.name } });
                    if (!entity) {
                        entity = await this.prisma.consumableType.create({ data: { name: ct.name } });
                    }
                    return entity;
                })
            );
            consumableTypeIds = entities.map(ct => ({ id: ct.id }));
        }

        const data: Prisma.AdventurerUpdateInput = {
            ...scalars,
            ...(specialtyId ? { specialtyId } : {}),
            ...(equipmentTypeIds
                ? { equipmentTypes: { set: equipmentTypeIds } }
                : {}),
            ...(consumableTypeIds
                ? { consumableTypes: { set: consumableTypeIds } }
                : {}),
        };

        try {
            return await this.prisma.adventurer.update({
                where: { id },
                data,
                include: {
                    specialty: true,
                    equipmentTypes: true,
                    consumableTypes: true,
                },
            });
        } catch (e: any) {
            if (e.code === 'P2025') {
                throw new NotFoundException('Aventurier introuvable');
            }
            throw e;
        }
    }
}
