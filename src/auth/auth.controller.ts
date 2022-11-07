import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { any } from 'cypress/types/bluebird';
import { get } from 'cypress/types/lodash';

import { gMessage } from 'src/global/global.config';

import { nodeMailer } from 'src/global/nodeMailer';
import { sendResponse } from 'src/global/response.helper';
import { AuthService } from './auth.service';
import { AuthDto, CreateDto } from './dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async login(@Request() req: any, @Response() res: any, @Body() dto: AuthDto) {
    //nodeMailer({ bibash: 'bibash' }, 'newAccount');
    return this.authService.login(res, dto);
  }

  @Post('signup')
  async signup(@Response() res: any, @Body() dto: CreateDto) {
    return this.authService.signup(res, dto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async callBack(@Request() req: any, @Response() res: any) {
    const jwt = await this.authService.token(req.user);
    res.set('authorization', jwt);
    res.redirect('http://localhost:5001/api/v1/bibash');
  }
}
