import { IsNotEmpty, IsString } from 'class-validator';

export class createProvienceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  area: string;

  nofDistrict: string;
}

export class createDistrictdto {
  @IsString()
  @IsNotEmpty()
  name: string;

  area: string;

  @IsNotEmpty()
  proviencesId: string;

  nofCity: string;

  addedBy: string;
}

export class createCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  area: string;

  @IsNotEmpty()
  proviencesId: string;

  @IsNotEmpty()
  districtId: string;

  addedBy: string;
}
