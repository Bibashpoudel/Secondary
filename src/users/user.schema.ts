import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from 'src/company/company.schema';

export type UserDocument = User & Document;

enum Role {
  User, //or User = "user",
  super_admin, // or Admin = "admin",
  admin,
}

@Schema()
export class User {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  profile: string;

  @Prop()
  role: Role;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
    required: false,
  })
  companyId: Company;
}
export const UserSchema = SchemaFactory.createForClass(User);
