import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/user.schema';
import { District } from './district.schema';
import { Proviences } from './provinces.schema';

export type CityDocument = City & Document;

@Schema()
export class City {
  @Prop()
  name: string;
  @Prop()
  area: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proviences',
    required: true,
  })
  proviencesId: Proviences;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
    required: true,
  })
  districtId: District;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  addedBy: User;
}

export const citySchema = SchemaFactory.createForClass(City);
