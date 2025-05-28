// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class S2SJwtStrategy extends PassportStrategy(Strategy, 's2s-jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.S2S_SHARED_SECRET,
            algorithms: ['HS256'],
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
