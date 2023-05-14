import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ProductModule } from 'src/product/product.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [ProductModule, TokenModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
