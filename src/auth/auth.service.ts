import { HttpStatus, Injectable, Response } from '@nestjs/common';
import { sendResponse } from 'src/global/response.helper';

import * as argon from 'argon2';
import { User, UserDocument } from 'src/users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { gMessage } from 'src/global/global.config';

@Injectable({})
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async login(@Response() res: any, dto: any) {
    try {
      const euser = await this.userModel.findOne({
        email: dto.username,
      });

      if (euser) {
        if (await argon.verify(euser.password, dto.password)) {
          return sendResponse(
            res,
            HttpStatus.OK,
            true,
            euser,
            null,
            gMessage.dataObtain,
            await this.token(euser),
          );
        } else {
          return null;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async signup(res: any, dto: any) {
    try {
      console.log(dto);
      const euser = await this.userModel.findOne({
        email: dto.email,
      });

      console.log(euser);
      // if user does not exist throw exception
      if (euser) {
        return sendResponse(
          res,
          HttpStatus.BAD_REQUEST,
          false,
          'user already exist',
          null,
          'failure',
          null,
        );
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
        return sendResponse(
          res,
          HttpStatus.CREATED,
          true,
          'user created ',
          null,
          'successfull',
          null,
        );
      }
    } catch (error) {
      return sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        null,
        error,
        'error',
        null,
      );
    }
  }

  async token(user: any) {
    const payload = {
      name: user.fullName,
      id: user._id,
      phone: user.phone,
      role: user.role ? user.role : 'bibash',
    };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
