import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  validatePassword(user: User, password) {
    return user && user.password === password;
  }

  getUsers(): Promise<Array<User> | undefined> {
    return this.usersRepository.createQueryBuilder('user')
    .select(['user.id', 'user.email'])
    .getMany();
  }

  findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email });
  }

  async create(user: User) {
    const userCreated = await this.usersRepository.save(user).catch(err => null);

    if (!userCreated) {
      return null;
    }

    const { password: savePassword, ...userData } = userCreated;

    return {
      access_token: this.jwtService.sign(userData)
    };
  }
}
