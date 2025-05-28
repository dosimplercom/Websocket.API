// src/appointments/appointments.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { S2SJwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(S2SJwtAuthGuard)
@Controller('api/appointments')
export class AppointmentsController {
    constructor(private readonly service: AppointmentsService) { }

    @Post('notify')
    notify(@Body() body: { event: 'created' | 'updated' | 'removed'; data: any }) {
        this.service.notify(body.event, body.data);
        return { status: 'ok' };
    }
}
