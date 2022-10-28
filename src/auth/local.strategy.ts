import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { sendResponse } from 'src/global/response.helper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const dto = { email: email, password: password };
    console.log('dto', dto);
    const user = await this.authService.login(dto);
    console.log('user', user);
    if (!user) {
      return sendResponse(
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
