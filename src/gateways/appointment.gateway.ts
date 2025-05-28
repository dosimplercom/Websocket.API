// src/gateways/appointment.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({ cors: true })
export class AppointmentGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    async handleConnection(client: Socket) {
        const token = client.handshake.auth.token || client.handshake.query.token;

        try {
            const decoded = jwt.verify(token as string, 'your_jwt_secret');
            (client as any).user = decoded;
            console.log(`WebSocket connected: ${decoded}`);//.username
        } catch (err) {
            console.log('Invalid token, disconnecting client');
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected`);
    }

    emitCreated(payload: any) {
        this.server.emit('Appointment:Created', payload);
    }

    emitUpdated(payload: any) {
        this.server.emit('Appointment:Updated', payload);
    }

    emitRemoved(payload: any) {
        this.server.emit('Appointment:Removed', payload);
    }
}
