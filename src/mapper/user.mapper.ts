import { UserDto } from "src/dto/user.dto";
import { User } from "src/model/user.entity";
import { PhotoMapper } from "./photo.mapper";

export class UserMapper {
    public static toEntity(userDto:UserDto) : User
    {
      let user = new User();
      user.age = userDto.age;
      user.firstName = userDto.firstName;
      user.lastName = userDto.lastName;
      user.email = userDto.email;
    

      if(userDto.photos)
      user.photos = userDto.photos.map(photo=>PhotoMapper.toEntity(photo));
      return user;
    }

    public static toDto(user:User) : UserDto
    {
      let userDto = new UserDto();
      userDto.age = user.age;
      userDto.firstName = user.firstName;
      userDto.lastName = user.lastName;
      userDto.email = user.email;
      userDto.id = user.id;
      if(user.photos)
      userDto.photos = user.photos.map(photo=>PhotoMapper.toDto(photo));

      return userDto;
    }
}