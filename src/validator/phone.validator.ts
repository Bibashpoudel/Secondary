import { InjectModel } from '@nestjs/mongoose';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { Message } from 'src/users/user.config';
import { User, UserDocument } from 'src/users/user.schema';

@ValidatorConstraint({ name: 'phone', async: true })
class CustomPhonevalidator implements ValidatorConstraintInterface {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validate(value: string) {
    try {
      const user: any = await this.userModel?.findOne({ phone: value });

      if (user) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  defaultMessage(agrs?: ValidationArguments): string {
    return Message.phoneExist;
  }
}

export { CustomPhonevalidator };
