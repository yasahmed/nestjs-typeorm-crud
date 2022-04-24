import { Controller, Get,Post,Body,Query,Param,Put,Delete,Logger } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user.dto';
import { UserMapper } from 'src/mapper/user.mapper';

@Controller("users")
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userDto: UserDto) {
    this.logger.log("create a user");
    const user = await this.userService.save(UserMapper.toEntity(userDto))
    return UserMapper.toDto(user);
  }

  @Get()
  async findAll() {
    const users = await this.userService.getAll();
    return users.map(user=>UserMapper.toDto(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    return UserMapper.toDto(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() userDto: UserDto) {
    const user = await  this.userService.update(id,UserMapper.toEntity(userDto));
    return UserMapper.toDto(user);
  }

  @Delete(':id')
   remove(@Param('id') id: number) {
    this.userService.delete(id);
  }
}
