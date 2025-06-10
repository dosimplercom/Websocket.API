// src/gateways/appointment.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from 'src/auth/ws-jwt-auth.guard';
import { WsUser } from 'src/auth/ws-user.decorator';

@WebSocketGateway({ cors: true })
export class AppointmentGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token || client.handshake.query.token;

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '');// this should be your secret key which authentication system uses during login process.
      (client as any).user = decoded;
      //console.log(`WebSocket connected: ${Object.keys(decoded)}`);
      if (typeof decoded === 'object' && decoded !== null && 'full_name' in decoded) {
        console.log(`WebSocket connected: ${(decoded as any).full_name}`);
      }
    } catch (err) {
      console.log('Invalid token, disconnecting client');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected`, client.id);
  }

  emitCreated(payload: any) {
    console.log('Emitting Appointment:Created', payload);
    this.server.emit('Appointment:Created', payload);
  }

  emitUpdated(payload: any) {
    console.log('Emitting Appointment:Updated', payload);
    this.server.emit('Appointment:Updated', payload);
  }

  emitRemoved(payload: any) {
    console.log('Emitting Appointment:Removed', payload);
    this.server.emit('Appointment:Removed', payload);
  }

  // example of a message handler that uses the WsJwtAuthGuard
  // This will ensure that the user is authenticated before processing the message
  // this is when Client sends a message to the server
  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('test')
  handleTest(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    @WsUser() user: any,
  ) {
    console.log('Authenticated user:', user.full_name || user.email || user.id);
    console.log('Received test message:', data);
    return { message: 'Received', user };
  }
}
