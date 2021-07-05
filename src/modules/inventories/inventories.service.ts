import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  getProducts(userId: number): Promise<Product[]> {
    return this.productsRepository.find({ userId });
  }

  createProduct(product: Product): Promise<Product> {
    return this.productsRepository.save(product).catch(err => null);
  }
}
