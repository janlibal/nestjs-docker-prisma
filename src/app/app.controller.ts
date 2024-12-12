import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { AppService } from './app.service'
import { AuthEmailLoginDto } from './dto/auth.email.login.dto'
import { LoginResponseDto } from './dto/login.response.dto'
import { User } from './domain/user.domain'
import { Session } from 'src/session/domain/session.domain'
import { Session as SessionEntity } from '@prisma/client'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginDto: AuthEmailLoginDto): Promise<User> {
    return this.appService.validateLogin(loginDto)
  }

  @Get('session')
  @HttpCode(HttpStatus.OK)
  public session(
    @Body() data: Omit<Session, 'expiresAt' | 'createdAt' | 'hash' | 'userId'>,
  ): Promise<Session> {
    return this.appService.getSession(data)
  }
}
