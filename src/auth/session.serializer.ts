import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/users/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }
  serializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, { id: user });
  }
  deserializeUser(payload: any, done: (err: Error, user: any) => void) {
    const user = this.userService.FindById(payload.id);
    done(null, payload);
  }
}
