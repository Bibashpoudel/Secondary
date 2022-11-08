import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guard/auth.guard';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

import { gMessage } from 'src/global/global.config';
import { sendResponse } from 'src/global/response.helper';

import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('profile')
  async profile(@Request() req: any, @Response() res: any) {
    return sendResponse(
      res,
      HttpStatus.OK,
      true,
      req.user,
      null,
      gMessage.dataObtain,
      null,
    );
  }
}
