import { Injectable } from '@nestjs/common';
import { sendResponse } from 'src/global/response.helper';

import * as argon from 'argon2';
import { User, UserDocument } from 'src/users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable({})
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async login(dto: any) {
    console.log('dto', dto);
    try {
      const euser = await this.userModel.findOne({
        email: dto.email,
      });
      // if user does not exist throw exception
      if (!euser) {
        return sendResponse(false, 'user doesnot exist', null, 'failure', null);
      }
      if (euser) {
        if (await argon.verify('10', dto.password)) {
          return euser;
        } else {
          return null;
        }
      }
    } catch (error) {}
  }
  async signup(dto: any) {
    try {
      const euser = await this.userModel.findOne({
        email: dto.email,
      });
      // if user does not exist throw exception
      if (euser) {
        return sendResponse(false, 'user already exist', null, 'failure', null);
      }
      const hash = await argon.hash(dto.password);
      const user = new this.userModel({
        email: dto.email,
        password: hash,
        fullName: dto.fullName,
        phone: dto.phone,
      });
      await user.save();
      if (user) {
        console.log(user);
        return sendResponse(true, 'user created ', null, 'successfull', null);
      }
    } catch (error) {
      throw error;
      return sendResponse(false, null, error, 'error', null);
    }
  }
}
