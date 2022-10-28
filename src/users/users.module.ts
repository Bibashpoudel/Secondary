import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomEmailvalidator } from 'src/validator/email.validator';
import { CustomPhonevalidator } from 'src/validator/phone.validator';
import { User, UserSchema } from './user.schema';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [CustomEmailvalidator, CustomPhonevalidator],
})
export class UsersModule {}
