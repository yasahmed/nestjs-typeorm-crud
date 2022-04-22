import {  DocumentBuilder } from '@nestjs/swagger';

  export const SwaggerConfig = new DocumentBuilder()
  .setTitle('User/Photos example')
  .setDescription('The User/Photos API description')
  .setVersion('1.0')
  .addTag('User/Photos')
  .build();