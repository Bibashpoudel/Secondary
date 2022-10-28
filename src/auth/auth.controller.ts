import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { nodeMailer } from 'src/global/nodeMailer';
import { sendResponse } from 'src/global/response.helper';
import { AuthService } from './auth.service';
import { AuthDto, CreateDto } from './dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req: any) {
    //nodeMailer({ bibash: 'bibash' }, 'newAccount');
    console.log('bibash');
    return req.user;
  }

  @Post('signup')
  async signup(@Body() dto: CreateDto) {
    return this.authService.signup(dto);
  }
}
