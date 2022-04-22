import { UserDto } from "src/dto/user.dto";
import { User } from "src/model/user.entity";

export class UserMapper {
    public static toEntity(userDto:UserDto) : User
    {
      let user = new User();
      user.age = userDto.age;
      user.firstName = userDto.firstName;
      user.lastName = userDto.lastName;
      user.id = userDto.id;
      return user;
    }

    public static toDto(userDto:User) : UserDto
    {
      let user = new UserDto();
      user.age = userDto.age;
      user.firstName = userDto.firstName;
      user.lastName = userDto.lastName;
      user.id = userDto.id;
      return user;
    }
}