import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
    constructor(@Inject("AUTH_CLIENT") private authclient:ClientProxy){}

    login(body){
        return this.authclient.send('auth.login',body);
    }

    register(body){
        return this.authclient.send('auth.register',body);
    }

}
