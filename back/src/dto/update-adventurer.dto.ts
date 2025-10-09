import { PartialType } from '@nestjs/mapped-types';
import CreateAdventurerDto from './create-adventurer.dto';

export class UpdateAdventurerDto extends PartialType(CreateAdventurerDto) {}
