import { Module,MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/db.config';
import { UserRepository } from './repository/user.repository';
import { User } from './model/user.entity';
import LogsMiddleware from './tool/http.logger';
import { APP_FILTER } from '@nestjs/core';

import { AllExceptionsFilter } from './exception/handler.exception';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TypeOrmModule.forFeature([User,UserRepository]),
  ],
  
  controllers: [UserController],
  providers: [UserService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .forRoutes('*');
  }
}
