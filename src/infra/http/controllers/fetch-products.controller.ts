import { BadRequestException, Controller, Get } from "@nestjs/common";
import { FetchProductsUseCase } from "src/domain/products/application/use-cases/fetch-products";
import { ProductPresenter } from "../presenter/product-presenter";

@Controller("/products")
export class FetchProductsController {
  constructor(private fetchProductsUseCase: FetchProductsUseCase) {}

  @Get()
  async handle() {
    const result = await this.fetchProductsUseCase.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      products: result.value.products.map(ProductPresenter.toHTTP),
    }
  }
}