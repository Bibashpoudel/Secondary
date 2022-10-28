import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/user.schema';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop()
  companyName: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  district: string;

  @Prop()
  province: string;
}
export const companySchema = SchemaFactory.createForClass(Company);
