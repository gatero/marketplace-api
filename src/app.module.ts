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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'root',
      password: '',
      database: '',
      entities: [User, Product],
      synchronize: true,
    }),
    UsersModule, AuthModule, ProvidersModule, InventoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
