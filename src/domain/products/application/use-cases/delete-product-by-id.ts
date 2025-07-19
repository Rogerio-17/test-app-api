import { Either, left, right } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { ProductsRepository } from "../repositories/products-repository"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error"

interface DeleteProductByIdUseCaseRequest {
  productId: string
}

type DeleteProductByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>

@Injectable()
export class DeleteProductByIdUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(
    { productId }: DeleteProductByIdUseCaseRequest
  ): Promise<DeleteProductByIdUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    await this.productsRepository.delete(productId)

    return right(null)
  }
}
