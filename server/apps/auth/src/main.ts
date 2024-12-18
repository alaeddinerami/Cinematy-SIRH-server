import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options:{
        host: 'localhost',
        port: 3001
      },
    },
  );
  await app.listen();
  console.log('Microservice is listening on port 3001');
  
}
bootstrap();
