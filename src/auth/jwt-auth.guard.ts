// src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class S2SJwtAuthGuard extends AuthGuard('s2s-jwt') {}
