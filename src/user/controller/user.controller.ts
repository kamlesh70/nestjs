import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, DefaultValuePipe, ParseArrayPipe } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserByEmail(@Body() body: any){
    return this.userService.findOneByEmail(body?.email);
  }
}
