import { Either, right } from "src/core/either"
import { Product } from "../../enterprise/entities/product"
import { Injectable } from "@nestjs/common"
import { ProductsRepository } from "../repositories/products-repository"
import { findFirstMissingAlphabetLetter } from "src/infra/utils/find-first-missing-alphabet-letter"

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
    const firstMissingLetter = findFirstMissingAlphabetLetter([name])

    const product = Product.create({
      sku,
      name,
      price,
      firstMissingLetter,
      description,
    })

    await this.productsRepository.create(product)

    return right({
      product,
    })
  }
}
