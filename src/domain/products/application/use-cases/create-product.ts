import { Either, right } from "src/core/either"
import { Product } from "../../enterprise/entities/product"
import { Injectable } from "@nestjs/common"
import { ProductsRepository } from "../repositories/products-repository"

interface CreateProductUseCaseRequest {
  sku: string
  name: string
  price: number
  description?: string
}

type CreateProductUseCaseResponse = Either<
  null,
  {
    product: Product
  }
>

@Injectable()
export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    price,
    sku,
    description
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = Product.create({
      sku,
      name,
      price,
      description,
    })

    await this.productsRepository.create(product)

    return right({
      product,
    })
  }
}
