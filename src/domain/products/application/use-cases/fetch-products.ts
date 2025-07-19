import { Either, right } from "src/core/either"
import { Product } from "../../enterprise/entities/product"
import { Injectable } from "@nestjs/common"
import { ProductsRepository } from "../repositories/products-repository"

type FetchProductsUseCaseResponse = Either<
  null,
  {
    products: Product[]
  }
>

@Injectable()
export class FetchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productsRepository.findMany()

    return right({
      products,
    })
  }
}
