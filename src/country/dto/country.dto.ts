import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class createProvienceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  area: string;

  nofDistrict: string;

  id: string;
}

export class createDistrictdto {
  @IsString()
  @IsNotEmpty()
  name: string;

  area: string;

  @IsNotEmpty()
  provincesId: string;

  nofCity: string;

  addedBy: string;
}

export class createCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  area: string;

  @IsString()
  @IsNotEmpty()
  provincesId: string;

  @IsString()
  @IsNotEmpty()
  districtId: string;

  addedBy: string;
}
