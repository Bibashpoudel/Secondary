import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { createCityDto, createDistrictdto, createProvienceDto } from './dto';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Post('provinces/add')
  async addProvinces(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: createProvienceDto,
  ) {
    console.log(dto);
    return this.countryService.addProvinces(res, req, dto);
  }
  @Get('provinces/get')
  async getProvinces(@Response() res: any, @Request() req: any) {
    return this.countryService.getProviences(res, req);
  }
  @Delete('provinces/delete/:id')
  async deleteProvinces(@Response() res: any, @Request() req: any) {
    return this.countryService.deleteProvince(res, req);
  }
  @Post('district/add')
  async addDistrict(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: createDistrictdto,
  ) {
    return this.countryService.addDistrict(res, req, dto);
  }
  @Get('district/get')
  async getDistrict(@Response() res: any, @Request() req: any) {
    return this.countryService.getDistrict(res, req);
  }
  @Delete('provinces/delete/:id')
  async deleteDistrict(@Response() res: any, @Request() req: any) {
    return this.countryService.deleteDistrict(res, req);
  }

  @Post('city/add')
  async addCity(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: createCityDto,
  ) {
    return this.countryService.addCity(res, req, dto);
  }
  @Get('city/get')
  async getCity(@Response() res: any, @Request() req: any) {
    return this.countryService.getCity(res, req);
  }
  @Delete('city/delete/:id')
  async deleteCity(@Response() res: any, @Request() req: any) {
    return this.countryService.deleteCity(res, req);
  }
}
