// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppointmentGateway } from './gateways/appointment.gateway';
import { AppointmentsService } from './appointments/appointments.service';
import { AppointmentsController } from './appointments/appointments.controller';
import { S2SJwtStrategy } from './auth/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentGateway, AppointmentsService, S2SJwtStrategy],
})
export class AppModule { }
