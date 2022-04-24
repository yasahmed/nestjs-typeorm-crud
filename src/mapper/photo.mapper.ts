import { PhotoDto } from "src/dto/photo.dto";
import { Photo } from "src/model/photo.entity";

export class PhotoMapper {
    public static toEntity(photoDto:PhotoDto) : Photo
    {
      let photo = new Photo();
      photo.name = photoDto.name;
      photo.description = photoDto.description;
      return photo;
    }

    public static toDto(photo:Photo) : PhotoDto
    {
        let photoDto = new PhotoDto();
        photoDto.name = photo.name;
        photoDto.description = photo.description;
        return photoDto;
    }
}