import { Controller, Get,Post,Body,Query,Param,Put,Delete,Logger } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user.dto';

@Controller("users")
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly appService: UserService) {}

  @Post()
  create(@Body() createCatDto: UserDto) {
    return createCatDto;
  }

  @Get()
  findAll(@Query() page:number,size:number) {
    this.logger.log('Doing something...');
    return this.appService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCatDto: UserDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return `This action removes a #${id} cat`;
  }
}
