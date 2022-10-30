import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { CountryService } from './country.service';
import { createDistrictdto, createProvienceDto } from './dto';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Post('provinces/add')
  async addProvinces(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: createProvienceDto,
  ) {
    return this.countryService.addProviences(res, req, dto);
  }
  @Post('provinces/get')
  async getProvinces(@Response() res: any, @Request() req: any) {
    return this.countryService.getProviences(res, req);
  }
  @Post('distrct/add')
  async adddistrict(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: createDistrictdto,
  ) {
    return this.countryService.addDistrict(res, req, dto);
  }
}
