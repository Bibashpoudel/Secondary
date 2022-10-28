import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProviencesDocument = Proviences & Document;

@Schema()
export class Proviences {
  @Prop()
  name: string;

  @Prop()
  area: string;

  @Prop()
  nofDistrict: string;
}

export const proviencesSchema = SchemaFactory.createForClass(Proviences);
