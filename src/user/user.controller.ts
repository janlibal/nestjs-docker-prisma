import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { UsersService } from './user.service'
import { AuthEmailLoginDto } from '../app/dto/auth.email.login.dto'

@Controller()
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('user')
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginDto: AuthEmailLoginDto) {
    return this.userService.create(loginDto)
  }
}
