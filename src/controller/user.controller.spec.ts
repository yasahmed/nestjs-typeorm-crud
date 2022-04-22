import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/service/user.service';
import { UserController } from './user.controller';

describe('AppController', () => {
  let appController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    appController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.findOne(1)).toBe('Hello World!');
    });
  });
});
