// src/appointments/appointments.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { InternalAuthGuard } from 'src/auth/internal-auth.guard';

@UseGuards(InternalAuthGuard)
@Controller('api/appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  @Post('notify')
  notify(
    @Body() body: { event: 'created' | 'updated' | 'removed'; data: any },
  ) {
    try {
      if (!['created', 'updated', 'removed'].includes(body.event)) {
        throw new Error(`Invalid event type: ${body.event}`);
      }
      this.service.notify(body.event, body.data);
      return { status: 'ok' };
    } catch (error) {
      console.error(`Error in notify endpoint: ${error.message}`);
      throw error; // Re-throw the error to be handled by the global exception filter
    }
  }
}
