import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

interface AuthResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  
}

@Injectable()
export class AuthService {

  private keycloakUrl = 'http://localhost:8080/realms/mjtech/protocol/openid-connect/token';
  private clientId = 'public-client';
  private scope = 'email openid' 


  async login(data): Promise<any> {
    
    const {username, password} = data;
    
    try {
      const response = await axios.post<AuthResponse>(
        this.keycloakUrl,
        new URLSearchParams({
          grant_type: 'password',
          client_id: this.clientId,
          scope: this.scope,
          username,
          password,
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );

      return response.data; 
    } catch (error) {
     return new NotFoundException(error.response?.data)
    }
  }

  async getAdminToken(): Promise<string> {
    try {
      const response = await axios.post(
        this.keycloakUrl,
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: 'confidential-client',
          client_secret: 'xaSIHJWbz3norMJ2L2FcD1inLf17LbZZ',
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      return response.data.access_token;
    } catch (error) {
      throw new HttpException('Failed to get admin token', 500);
    }
  }

  async register(data): Promise<any> {
    const { username, email, password } = data;

    try {
      const adminToken = await this.getAdminToken();
  
      const response = await axios.post(
        `http://localhost:8080/admin/realms/mjtech/users`,
        {
          username,
          email,
          enabled: true,
          credentials: [
            {
              type: 'password',
              value: password,
              temporary: false, 
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return {
        message: 'User registered successfully!',
        statusCode: 201,
        user: {
          username,
          email,
        },
      };
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      throw new HttpException('Registration failed', 500);
    }
  }

  
}