// src/auth/internal-auth.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class InternalAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const key = request.headers['internal-ws-api-key'];
    if (!key || key !== process.env.INTERNAL_WEBSOCKET_API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}
