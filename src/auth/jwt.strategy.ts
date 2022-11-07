import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'BibashPoudel',
    });
  }
  async validate(payload: any) {
    return {
      id: payload.id,
      name: payload.name,
      phone: payload.phone,
      role: payload.role,
    };
  }
}
