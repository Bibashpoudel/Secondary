import { HttpStatus, Injectable, Request, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { errorMessage } from 'src/global/debuge.mail';
import { gMessage } from 'src/global/global.config';
import { nodeMailer } from 'src/global/nodeMailer';
import {
  getQueryRequest,
  paginationHelper,
  sendResponse,
} from 'src/global/response.helper';

import { City, CityDocument } from './city.schema';
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
    @InjectModel(City.name)
    private cityModel: Model<CityDocument>,
  ) {}

  /* 
    this is the function to add the proviences 
    to update the proviences
    
     */
  async addProvinces(@Response() res: any, @Request() req: any, dto: any) {
    try {
      console.log(dto);
      if (req.body.id) {
        console.log('enter');
        const provience = await this.proviencesModel.findOne({
          _id: req.body.id,
        });
        provience.name = dto.name;
        provience.area = dto.id;

        await provience.save();
        return sendResponse(
          res,
          HttpStatus.OK,
          true,
          null,
          null,
          Message.proviencesUpdated,
          null,
        );
      } else {
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
      }
    } catch (error) {
      //send error message through mail for debuging
      // errorMessage(error);
      console.log(error);
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

  async getProviences(@Response() res: any, @Request() req: any) {
    try {
      const defaultSize: any = 10;
      let searchq: any;
      let selectq: any;
      let sortq: any;
      let page: any;
      let size: any;
      let populate: any;
      let populate1: any;

      if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
        page = Math.abs(req.query.page);
      } else {
        page = 1;
      }
      if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
        size = Math.abs(req.query.size);
      } else {
        size = defaultSize;
      }

      const datas = await getQueryRequest(
        this.proviencesModel,
        searchq,
        selectq,
        sortq,
        page,
        size,
        populate,
        populate1,
      );
      console.log('total daat', datas.totalData);
      return paginationHelper(
        res,
        HttpStatus.OK,
        true,
        datas.data,
        gMessage.dataObtain,
        page,
        size,
        datas.totalData,
      );
    } catch (error) {
      // send error message through mail for debuging

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
    this function is to delete the province using id
  */
  async deleteProvince(@Response() res: any, @Request() req: any) {
    try {
      await this.proviencesModel.findOneAndDelete({
        _id: req.params.id,
      });
      return sendResponse(
        res,
        HttpStatus.OK,
        true,
        null,
        null,
        Message.proviencesDeleted,
        null,
      );
    } catch (error) {
      // send error message through mail for debuging

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
      this function is to add the district 
      to update the dsitrict also
        any user who are login can add district
      */
  async addDistrict(@Response() res: any, @Request() req: any, dto: any) {
    try {
      if (req.body.id) {
        const district = await this.districtsModel.findOne({
          _id: req.body.id,
        });

        district.name = req.body.name;
        district.area = req.body.area;
        district.provincesId = req.body.provincesId;

        await district.save();
        return sendResponse(
          res,
          HttpStatus.OK,
          true,
          null,
          null,
          Message.districtUpdated,
          null,
        );
      } else {
        const district = new this.districtsModel({
          name: dto.name,
          area: dto.area,
          provincesId: dto.provincesId,
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
      }
    } catch (error) {
      /* 
      send error message through mail for debuging 
      */
      // errorMessage(error);
      console.log(error);
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

  async getDistrict(@Response() res: any, @Request() req: any) {
    try {
      const defaultSize: any = 10;
      let searchq: any;
      let selectq: any;
      let sortq: any;
      let page: any;
      let size: any;
      let populate: any;
      let populate1: any;
      populate = { path: 'provincesId', select: 'name' };

      if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
        page = Math.abs(req.query.page);
      } else {
        page = 1;
      }
      if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
        size = Math.abs(req.query.size);
      } else {
        size = defaultSize;
      }

      const datas = await getQueryRequest(
        this.districtsModel,
        searchq,
        selectq,
        sortq,
        page,
        size,
        populate,
        populate1,
      );

      return paginationHelper(
        res,
        HttpStatus.OK,
        true,
        datas.data,
        gMessage.dataObtain,
        page,
        size,
        datas.totalData,
      );
    } catch (error) {
      // send error message through mail for debuging

      // errorMessage(error);
      console.log(error);
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
    this function is to delete the district using id
  */
  async deleteDistrict(@Response() res: any, @Request() req: any) {
    try {
      await this.districtsModel.findOneAndDelete({
        _id: req.params.id,
      });
      return sendResponse(
        res,
        HttpStatus.OK,
        true,
        null,
        null,
        Message.districtDeleted,
        null,
      );
    } catch (error) {
      // send error message through mail for debuging

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
  async addCity(@Response() res: any, @Request() req: any, dto: any) {
    try {
      if (req.body.id) {
        const city = await this.cityModel.findOne({ _id: req.body.id });
        city.name = dto.name;
        city.area = dto.area;
        city.provincesId = dto.provincesId;
        city.districtId = dto.districtId;

        await city.save();

        return sendResponse(
          res,
          HttpStatus.OK,
          true,
          null,
          null,
          Message.cityUpdated,
          null,
        );
      } else {
        const city = new this.cityModel({
          name: dto.name,
          area: dto.area,
          provincesId: dto.provincesId,
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
      }
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
        This function is to display all the provience
    */

  async getCity(@Response() res: any, @Request() req: any) {
    try {
      const defaultSize: any = 10;
      let searchq: any;
      let selectq: any;
      let sortq: any;
      let page: any;
      let size: any;
      let populate: any;
      let populate1: any;

      if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
        page = Math.abs(req.query.page);
      } else {
        page = 1;
      }
      if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
        size = Math.abs(req.query.size);
      } else {
        size = defaultSize;
      }

      populate = {
        path: 'provincesId',
      };
      populate1 = { path: 'districtId' };
      const datas = await getQueryRequest(
        this.cityModel,
        searchq,
        selectq,
        sortq,
        page,
        size,
        populate,
        populate1,
      );

      return paginationHelper(
        res,
        HttpStatus.OK,
        true,
        datas.data,
        gMessage.dataObtain,
        page,
        size,
        datas.totalData,
      );
    } catch (error) {
      // send error message through mail for debuging

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
    this function is to delete the city using id
  */
  async deleteCity(@Response() res: any, @Request() req: any) {
    try {
      await this.cityModel.findOneAndDelete({
        _id: req.params.id,
      });
      return sendResponse(
        res,
        HttpStatus.OK,
        true,
        null,
        null,
        Message.cityDeleted,
        null,
      );
    } catch (error) {
      // send error message through mail for debuging

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
