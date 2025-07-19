import { Either, left, right } from "src/core/either"
import { Product } from "../../enterprise/entities/product"
import { Injectable } from "@nestjs/common"
import { ProductsRepository } from "../repositories/products-repository"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error"

interface GetProductByIdUseCaseRequest {
  productId: string
}

type GetProductByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    product: Product
  }
>

@Injectable()
export class GetProductByIdUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(
    { productId }: GetProductByIdUseCaseRequest
  ): Promise<GetProductByIdUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    return right({
      product,
    })
  }
}
