// src/auth/ws-jwt-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';

// The guard is used to protect FE -> WebSocket connections by validating JWT tokens.
@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token =
      client.handshake.auth?.token || client.handshake.query?.token;

    if (!token) {
      throw new WsException('Missing token');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '');// this should be your secret key which authentication system uses during login process.
      // Attach user to client for future use
      client.user = decoded;
      console.log(`Websocket connection permitted for user: ${decoded}`);
      return true;
    } catch (err) {
      throw new WsException('Invalid token');
    }
  }
}
