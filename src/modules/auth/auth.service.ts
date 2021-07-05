import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!this.usersService.validatePassword(user, password)) {
      return null;
    }

    const { password: savePassword, ...userData } = user;

    return userData;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user)
    };
  }
}
