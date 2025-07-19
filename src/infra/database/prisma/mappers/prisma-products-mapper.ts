import { Product as PrismaProduct, Prisma } from '@prisma/client/index'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Product } from 'src/domain/products/enterprise/entities/product'

export class PrismaProductMapper {
  static toDomain(raw: PrismaProduct): Product {
    return Product.create(
      {
        name: raw.name,
        sku: raw.sku,
        price: raw.price,
        description: raw.description ?? null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id.toString(),
      name: product.name,
      sku: product.sku,
      price: product.price,
      description: product.description ?? null,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt ?? null,
    }
  }
}
