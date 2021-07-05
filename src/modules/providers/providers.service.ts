import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getProducts(userId: number, data: any) {
    const query = await this.productsRepository.createQueryBuilder('product')
      .where('product.userId != :userId', { userId });

    if (data.search) {
      query.andWhere('product.name like :search OR product.sku like :search', {
        search: `%${data.search}%`
      });
    }

    if (data.range) {
      query.andWhere('product.price <= :range', {
        range: data.range
      });
    }


    return query.getMany();
  }

  async getProductsByProviders(usersIds: Array<number>) {
    const query = await this.productsRepository.createQueryBuilder('product')
      
    if (usersIds.length>0) {
      query.where('product.userId IN (:...usersIds)', { usersIds });
    }

    return query.getMany();
  }
}
