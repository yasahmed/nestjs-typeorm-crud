import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from 'src/exception/definition/custom.business.exception';
import { User } from 'src/model/user.entity';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepository) private readonly  userRepository: UserRepository) {}
  async getAll(): Promise<User[]> {
    const users =  await this.userRepository.find({relations: ['photos']});
    return users;
  }

  async findById(id: number): Promise<User> {
   const user =await  this.userRepository.findOne(  
    {
      relations: ['photos'],
      where:
        { id: id }
    });
   return user;
  }

  findByEmail(email: string): Promise<User> {
    return  this.userRepository.findOne(  
      {
        relations: ['photos'],
        where:
          { email: email }
      });
  }

  async save(user: User): Promise<User> {
    const existedUser = await this.findByEmail(user.email);
    if(!existedUser)
    return this.userRepository.save(user);
    else {
      throw new BusinessException("Email already exist !");
    }
  }

  async update(id:number,user: User): Promise<User> {
    let existedUser = await this.findById(id);
    existedUser.age = user.age;
    existedUser.firstName = user.firstName;
    existedUser.lastName = user.lastName;
    if(existedUser)
    return this.userRepository.save(existedUser);
    else {
      throw new BusinessException("User not found !");
    }
  }

  async delete(id:number): Promise<User> {
    const existedUser = await this.findById(id);
    if(existedUser)
      return this.userRepository.remove(existedUser);
    else {
      throw new BusinessException("User not found !");
    }
  }
}
