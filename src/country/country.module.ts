import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { City, citySchema } from './city/city.schema';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { District, districtSchema } from './district/district.schema';
import { Proviences, proviencesSchema } from './provinces/provinces.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: citySchema }]),
    MongooseModule.forFeature([
      { name: District.name, schema: districtSchema },
    ]),
    MongooseModule.forFeature([
      { name: Proviences.name, schema: proviencesSchema },
    ]),
  ],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
