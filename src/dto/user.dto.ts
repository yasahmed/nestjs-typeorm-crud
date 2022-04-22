import { PhotoDto } from "./photo.dto";
import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty,IsNumber,MaxLength,MinLength,Max,Min } from 'class-validator';

export class UserDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(25)
    @MinLength(4)
    firstName: string;

    @IsNotEmpty()
    @ApiProperty()
    @MaxLength(25)
    @MinLength(4)
    lastName: string;@ApiProperty()

    @IsNumber()
    @ApiProperty()
    @Max(120)
    @Min(10)
    age: number;

    @ApiProperty()
    photos: PhotoDto[]
  }