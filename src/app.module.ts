import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { ProvidersModule } from './modules/providers/providers.module';
import { InventoriesModule } from './modules/inventories/inventories.module';

import {
  IS_DEVELOPMENT
} from './constants/environment';

import {
  MYSQL_HOST,
  MYSQL_USERNAME,
  MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE,
} from './constants/database';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: MYSQL_HOST,
      username: MYSQL_USERNAME,
      password: MYSQL_ROOT_PASSWORD,
      database: MYSQL_DATABASE,
      entities: [User, Product],
      synchronize: IS_DEVELOPMENT
    }),
    UsersModule, AuthModule, ProvidersModule, InventoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
