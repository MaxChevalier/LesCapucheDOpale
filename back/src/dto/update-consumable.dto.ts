import {IsOptional, IsPositive, IsString} from 'class-validator';

export class UpdateConsumableDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsPositive()
    consumableTypeId?: number;

    @IsOptional()
    quantity?: number;

    @IsOptional()
    cost?: number;
}
