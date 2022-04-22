import {
    BaseEntity,
    BeforeInsert,
    OneToMany,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  import { ApiProperty } from '@nestjs/swagger';
import { Photo } from './photo.entity';
  
  @Entity({ name: 'users' })
  export class User extends BaseEntity {
    @ApiProperty({ description: 'Primary key as User ID', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty({ description: 'User name', example: 'JNAH Ahmed' })
    @Column()
    firstName: string;

    @ApiProperty({ description: 'User name', example: 'JNAH Ahmed' })
    @Column()
    lastName: string;

    @ApiProperty({ description: 'User Age', example: 'JNAH Ahmed' })
    @Column()
    age: number;
  
    @ApiProperty({
      description: 'User email address',
      example: 'jnah.ahmed@gmail.com',
    })
    @Column({
      unique: true,
    })
    email: string;
  
  
    @ApiProperty({ description: 'User date creation' })
    @CreateDateColumn()
    createdAt: Date;
  
    @ApiProperty({ description: 'User date updated' })
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Photo, photo => photo.user)
    photos: Photo[];
  
  
  }