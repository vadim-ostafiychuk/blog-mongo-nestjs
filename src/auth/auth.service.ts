import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { hashPassword } from 'src/utils/hash-password';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    const passwordHash = await hashPassword(registerDto.password);

    await this.usersService.createUser({
      ...registerDto,
      passwordHash,
    });
  }
}
