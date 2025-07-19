import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import type { ProductsRepository } from 'src/domain/products/application/repositories/products-repository'
import type { Product } from 'src/domain/products/enterprise/entities/product'
import { PrismaProductMapper } from '../mappers/prisma-products-mapper'

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return null
    }

    return PrismaProductMapper.toDomain(product)
  }

  async findMany(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      orderBy: {
        name: 'asc',
      }
    })

    return products.map(PrismaProductMapper.toDomain)
  }

  async findBySku(sku: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { sku },
    })

    if (!product) {
      return null
    }

    return PrismaProductMapper.toDomain(product)
  }

  async create(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product)

    await this.prisma.product.create({
      data
    })
  }

  async save(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product)

    await this.prisma.product.update({
      where: { id: product.id.toString() },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    })
  }
  
}
