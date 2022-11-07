import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@prisma/client';
import mongoose, { Document } from 'mongoose';
import { Proviences } from './provinces.schema';

export type DistrictDocument = District & Document;

@Schema()
export class District {
  @Prop()
  name: string;

  @Prop()
  area: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proviences',
    required: true,
  })
  provincesId: Proviences;

  @Prop()
  nofCity: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  addedBy: User;
}

export const districtSchema = SchemaFactory.createForClass(District);
