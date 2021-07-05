import { Controller, Post, Get, Body, Param, Request } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { Product } from '../../entities/product.entity';

@Controller('providers')
export class ProvidersController {
  constructor(
    private providersService: ProvidersService
  ) {}

  @Post('products')
  getProducts(@Request() req, @Body() body: any) {
    return this.providersService.getProducts(req.user.id, body);
  }

  @Post('admin/products')
  getProductsByProviders(@Request() req, @Body() body: Array<number>) {
    return this.providersService.getProductsByProviders(body);
  }

  @Get('products/:userId')
  getProductsByProvider(@Param('userId') userId: number) {
    return this.providersService.getProductsByProviders([userId]);
  }
}
