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

  async validate(
    username: string,
    password: string,
    @Response() res: any,
  ): Promise<any> {
    console.log('response', res);
    console.log('dto', username, 'abc', password);
    const dto = {
      username: username,
      password: password,
    };
    // const user = await this.authService.login(dto);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
  }
}
