import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/user.entity';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepository) private readonly  userRepository: UserRepository) {}
  getAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  findUserById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
