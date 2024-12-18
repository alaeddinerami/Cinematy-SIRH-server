import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule.register({defaultStrategy:'keycloak'})],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[PassportModule]
})
export class AuthModule {}
