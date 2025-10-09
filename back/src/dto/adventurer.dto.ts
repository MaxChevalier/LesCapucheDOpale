export class AdventurerDto {
    id: number;
    name: string;
    specialtyId: number;
    specialty: {
        id: number;
        name: string;
    };
    dailyRate: number;
    equipmentTypes: Array<{
        id: number;
        name: string;
    }>;
    consumableTypes: Array<{
        id: number;
        name: string;
    }>;
    experience: number;
}