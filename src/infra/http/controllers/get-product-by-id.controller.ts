import { BadRequestException, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductPresenter } from "../presenter/product-presenter";
import { GetProductByIdUseCase } from "src/domain/products/application/use-cases/get-products-by-id";

@Controller("/products/:id")
export class GetProductByIdController {
  constructor(private getProductByIdUseCase: GetProductByIdUseCase) {}

  @Get()
  async handle(
    @Param('id') productId: string,
  ) {
    const result = await this.getProductByIdUseCase.execute({
      productId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      product: ProductPresenter.toHTTP(result.value.product),
    }
  }
}