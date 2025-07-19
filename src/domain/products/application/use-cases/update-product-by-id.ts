import { Either, left, right } from "src/core/either"
import { Product } from "../../enterprise/entities/product"
import { Injectable } from "@nestjs/common"
import { ProductsRepository } from "../repositories/products-repository"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found-error"

interface UpdateProductByIdUseCaseRequest {
  productId: string
  name: string
  price: number
  sku: string
  description?: string
}

type UpdateProductByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    product: Product
  }
>

@Injectable()
export class UpdateProductByIdUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ 
    productId, 
    name, 
    price, 
    sku, 
    description 
  }: UpdateProductByIdUseCaseRequest): Promise<UpdateProductByIdUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    product.update({
      sku,
      name,
      price,
      description
    })

    await this.productsRepository.save(product)

    return right({
      product,
    })
  }
}
