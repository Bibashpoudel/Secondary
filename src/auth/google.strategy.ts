import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from 'src/users/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userServie: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5001/api/v1/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const email = profile.emails[0].value;

    if ((await this.userServie.findByEmail(email)) === false) {
      await this.userServie.createUser(
        email,
        profile.displayName,
        profile.photos[0].value,
      );
    }
    done(null, profile);
  }
}
