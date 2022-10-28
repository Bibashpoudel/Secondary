import { Body, Controller, Post, Response } from '@nestjs/common';
import { CountryService } from './country.service';
import { createProvienceDto } from './dto';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Post('provinces/add')
  async addProvinces(@Response() res: any, @Body() dto: createProvienceDto) {
    return this.countryService.addProviences(res, dto);
  }
}
