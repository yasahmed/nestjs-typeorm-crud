import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty,IsNumber,MaxLength,MinLength } from 'class-validator';

export class PhotoDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(25)
    @MinLength(4)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(4)
    description: string;
  }