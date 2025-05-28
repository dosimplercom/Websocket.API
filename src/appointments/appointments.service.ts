// src/appointments/appointments.service.ts
import { Injectable } from '@nestjs/common';
import { AppointmentGateway } from '../gateways/appointment.gateway';

@Injectable()
export class AppointmentsService {
    constructor(private gateway: AppointmentGateway) { }

    notify(event: 'created' | 'updated' | 'removed', data: any) {
        switch (event) {
            case 'created':
                this.gateway.emitCreated(data);
                break;
            case 'updated':
                this.gateway.emitUpdated(data);
                break;
            case 'removed':
                this.gateway.emitRemoved(data);
                break;
        }
    }
}
