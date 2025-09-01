import { Global, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { StoreOptions } from 'src/store/store.module';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from 'src/database/schema/user/User.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('TEST') private readonly test: any,
  ){
    console.log("test service in user ", this.test);
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email: email})
  }

}
