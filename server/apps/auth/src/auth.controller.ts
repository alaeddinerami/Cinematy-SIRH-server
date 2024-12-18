import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.login')
  login(data) {
    return this.authService.login(data);
  }


  @MessagePattern('auth.register')

  register(data){
    return this.authService.register(data);

  }

}