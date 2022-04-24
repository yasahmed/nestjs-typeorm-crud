import {
    BaseEntity,
    BeforeInsert,
    ManyToOne,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
  
  @Entity({ name: 'photos' })
  export class Photo extends BaseEntity {
    @ApiProperty({ description: 'Primary key as User ID', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty({ description: 'Role name', example: 'ROLE_CREATE' })
    @Column()
    name: string;
  
    @ApiProperty({ description: 'Role description' })
    @Column()
    description: string;
  
    @ApiProperty({ description: 'User date creation' })
    @CreateDateColumn()
    createdAt: Date;
  
    @ApiProperty({ description: 'User date updated' })
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.photos, { onDelete: 'CASCADE' })
    user: User;
  

  }