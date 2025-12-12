import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class FinishQuestDto {
  @ApiProperty({
    description: 'Durée de repos en jours pour les aventuriers',
    example: 3,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  restDurationDays: number;
}
