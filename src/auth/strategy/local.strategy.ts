import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Response } from '@nestjs/common';
import { AuthService } from '../auth.service';

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
  }
}
