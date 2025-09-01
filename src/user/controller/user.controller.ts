import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, DefaultValuePipe, ParseArrayPipe, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../service/user.service';
import { User } from 'src/decorators/user.decorator';
import JwtAuthGuard from 'src/guards/authGuards/JwtAuthGuard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserByEmail(@User() user: any){
    return this.userService.findOneByEmail(user?.email);
  }
}
