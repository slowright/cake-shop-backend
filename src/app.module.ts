import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Token } from './models/token.model';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import configuration from './configuration';
import { Product } from './models/product.model';
import { SearchModule } from './search/search.module';
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfgService: ConfigService) => ({
        dialect: 'postgres',
        host: cfgService.get('db_host'),
        port: Number(cfgService.get('db_port')),
        username: cfgService.get('db_user'),
        password: cfgService.get('db_password'),
        database: cfgService.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [User, Token, Product],
      }),
    }),
    AuthModule,
    TokenModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ProductModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
