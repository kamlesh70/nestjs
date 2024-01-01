import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import LoginDto from '../dto/Login.dto';
import JwtAuthGuard from 'src/guards/authGuards/JwtAuthGuard';
import JwtRefreshAuthGuard from 'src/guards/authGuards/JwtRefreshAuthGuard';
import { Request } from 'express';
import { AuthUserType } from '../types/AuthUserType';
import { User } from 'src/decorators/user.decorator';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  logIn(@Body() loginData: LoginDto){
    return this.authService.logIn(loginData);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logOut(@User() user: AuthUserType){
    return this.authService.logOut(user);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh-token')
  @HttpCode(HttpStatus.OK)
  refreshToken(@User() user: AuthUserType){
    return this.authService.refreshToken(user);
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  signup(@Body() createUser: CreateUserDto){
    return this.authService.signUp(createUser);
  }
}
