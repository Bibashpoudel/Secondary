import { HttpStatus, Injectable, Res, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { errorMessage } from 'src/global/debuge.mail';
import { gMessage } from 'src/global/global.config';
import { nodeMailer } from 'src/global/nodeMailer';
import { sendResponse } from 'src/global/response.helper';

import { CityDocument } from './city.schema';
import { Message } from './country.config';
import { District, DistrictDocument } from './district.schema';
import { Proviences, ProviencesDocument } from './provinces.schema';

@Injectable({})
export class CountryService {
  constructor(
    @InjectModel(Proviences.name)
    private proviencesModel: Model<ProviencesDocument>,
    @InjectModel(District.name)
    private districtsModel: Model<DistrictDocument>,
    @InjectModel(Proviences.name)
    private cityModel: Model<CityDocument>,
  ) {}

  /* 
    this is the function to add the proviences 
    to update the proviences
    
     */
  async addProviences(@Response() res: any, dto: any) {
    try {
      const proviences = new this.proviencesModel({
        name: dto.name,
        area: dto.area,
      });
      await proviences.save();
      return sendResponse(
        res,
        HttpStatus.CREATED,
        true,
        null,
        null,
        Message.proviencesAdd,
        null,
      );
    } catch (error) {
      //send error message through mail for debuging
      // errorMessage(error);
      return sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        null,
        gMessage.serverError,
        gMessage.somethingWrong,
        null,
      );
    }
  }
  /* 
        This function is to display all the provience
    */

  async getProviences(@Response() res: any) {
    try {
    } catch (error) {}
  }

  /* 
      this function is to add the district 
      to update the dsitrict also
        any user who are login can add district
      */
  async addDistrict(@Response() res: any, dto: any) {
    try {
      const district = new this.districtsModel({
        name: dto.name,
        area: dto.area,
        proviencesId: dto.proviencesId,
      });
      await district.save();
      return sendResponse(
        res,
        HttpStatus.CREATED,
        true,
        null,
        null,
        Message.districtAdd,
        null,
      );
    } catch (error) {
      /* 
      send error message through mail for debuging 
      */
      // errorMessage(error);
      return sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        null,
        gMessage.serverError,
        gMessage.somethingWrong,
        null,
      );
    }
  }
  /* 
      this function is to add the city 
      to update the dsitrict also
      any user who are login  can add city 
      */
  async addCity(@Response() res: any, dto: any) {
    try {
      const city = new this.cityModel({
        name: dto.name,
        area: dto.area,
        proviencesId: dto.proviencesId,
        districtId: dto.districtId,
      });
      await city.save();
      return sendResponse(
        res,
        HttpStatus.CREATED,
        true,
        null,
        null,
        Message.cityAdd,
        null,
      );
    } catch (error) {
      /* 
      send error message through mail for debuging 
      */
      // errorMessage(error);
      return sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        null,
        gMessage.serverError,
        gMessage.somethingWrong,
        null,
      );
    }
  }
}
