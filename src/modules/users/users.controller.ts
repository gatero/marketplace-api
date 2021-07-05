import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../../decorators/public.decorator';
import { User } from '../../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService
  ) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Public()
  @Post('create')
  create(@Body() user: User) {
    return this.userService.create(user);
  }
}
