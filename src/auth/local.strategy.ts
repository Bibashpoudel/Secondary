import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Body,
  HttpCode,
  HttpStatus,
  Injectable,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { sendResponse } from 'src/global/response.helper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validateUser(
    @Response() res: any,
    email: string,
    password: string,
  ): Promise<any> {
    const dto = { email: email, password: password };
    console.log('dto', dto);
    const user = await this.authService.login(res, dto);
    console.log('user', user);
    if (!user) {
      return sendResponse(
        res,
        HttpStatus.UNAUTHORIZED,
        false,
        null,
        'unathorized',
        'incorrect username or password',
        null,
      );
    }
    return user;
  }
}
