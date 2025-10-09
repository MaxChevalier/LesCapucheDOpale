import { IsString, IsArray, IsInt, Min, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Specialty {
    @IsString()
    name: string;
}

class EquipmentType {
    @IsString()
    name: string;
}

class ConsumableType {
    @IsString()
    name: string;
}

export class CreateAdventurerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @ValidateNested()
    @Type(() => Specialty)
    specialty: Specialty;

    @IsInt()
    @Min(0)
    dailyRate: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EquipmentType)
    equipmentTypes: EquipmentType[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ConsumableType)
    consumableTypes: ConsumableType[];

    @IsInt()
    @Min(0)
    experience: number;
}

export default CreateAdventurerDto
