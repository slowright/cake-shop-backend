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
import { Like } from './models/like.model';
import { LikeModule } from './like/like.module';
import { ProfileModule } from './profile/profile.module';
import { CartModule } from './cart/cart.module';
import { Cart } from './models/cart.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './models/roles.model';
import { UserRoles } from './models/user-roles.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
      exclude: ['/(.*)'],
    }),
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
        models: [User, Token, Product, Like, Cart, Role, UserRoles],
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
    LikeModule,
    ProfileModule,
    CartModule,
    RolesModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
