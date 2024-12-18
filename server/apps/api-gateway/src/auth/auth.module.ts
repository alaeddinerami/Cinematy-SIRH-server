import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[
    ClientsModule.register([
      {
        name:"AUTH_CLIENT",
        transport:Transport.TCP,
        options:{
          host: 'localhost',
          port:3001
        }
      }
    ])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
