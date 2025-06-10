// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppointmentGateway } from './gateways/appointment.gateway';
import { AppointmentsService } from './appointments/appointments.service';
import { AppointmentsController } from './appointments/appointments.controller';
import { ConfigModule } from '@nestjs/config';
import { WsJwtAuthGuard } from './auth/ws-jwt-auth.guard';
import { AppController } from './app.controller';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production'
    }),
  ],
  controllers: [AppointmentsController, AppController],
  providers: [AppointmentGateway, AppointmentsService, WsJwtAuthGuard],
})
export class AppModule { }
