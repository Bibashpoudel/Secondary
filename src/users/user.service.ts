import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable({})
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async Profile() {}

  async FindById(id: string) {}

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });

    if (user) {
      return true;
    } else {
      return false;
    }
  }
  async createUser(email: string, fullName: string, profile: string) {
    const user = new this.userModel({
      email: email,
      fullName: fullName,
      profile: profile,
    });
    await user.save();
    return true;
  }
}
