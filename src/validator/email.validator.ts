import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { NextFunction } from 'express';
import { Model } from 'mongoose';
import { Message } from 'src/users/user.config';
import { User, UserDocument } from 'src/users/user.schema';

@ValidatorConstraint({ name: 'emailId', async: true })
@Injectable({})
export class CustomEmailvalidator implements ValidatorConstraintInterface {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validate(value: string, args: ValidationArguments): Promise<any> {
    if (value == undefined || value == '') {
      return true;
    }
    try {
      const user = await this.userModel?.findOne({ email: value });

      if (user) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  defaultMessage(agrs?: ValidationArguments): string {
    return Message.emailExist;
  }
}
