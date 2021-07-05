import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { Product } from '../../entities/product.entity';

@Controller('inventories')
export class InventoriesController {
  constructor(
    private inventoriesService: InventoriesService
  ) {}

  @Get('products')
  getProducts(@Request() req) {
    return this.inventoriesService.getProducts(req.user.id);
  }

  @Post('products/create')
  createProduct(@Body() product: Product, @Request() req) {
    product.userId = req.user.id;
    return this.inventoriesService.createProduct(product);
  }
}
