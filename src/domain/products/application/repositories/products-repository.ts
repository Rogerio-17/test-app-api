import type { Product } from "../../enterprise/entities/product";

export abstract class ProductsRepository {
  abstract findById(id: string): Promise<Product | null>
  abstract findBySku(sku: string): Promise<Product | null>
  abstract findMany(): Promise<Product[]>
  abstract create(product: Product): Promise<void>
  abstract save(product: Product): Promise<void>
  abstract delete(id: string): Promise<void>
}
