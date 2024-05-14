import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(data: CreateUserDto) {
    let user = new this.userModel(data);

    try {
      user = await user.save();
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(error);
    }

    if (!user) {
      throw new ConflictException('User not created');
    }

    return user;
  }
}
