import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddlerware } from './utils/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyService } from './company/company.service';
import { CompanyModule } from './company/company.module';
import { CountryController } from './country/country.controller';
import { CountryModule } from './country/country.module';
import { CountryService } from './country/country.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    CompanyModule,
    CountryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost/secondary'),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddlerware).forRoutes('*');
  }
}
