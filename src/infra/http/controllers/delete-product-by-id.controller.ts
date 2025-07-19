import { BadRequestException, Controller, Delete, Param } from "@nestjs/common";
import { DeleteProductByIdUseCase } from "src/domain/products/application/use-cases/delete-product-by-id";

@Controller("/products/:id")
export class DeleteProductByIdController {
  constructor(private deleteProductByIdUseCase: DeleteProductByIdUseCase) {}

  @Delete()
  async handle(
    @Param('id') productId: string,
  ) {
    const result = await this.deleteProductByIdUseCase.execute({
      productId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      success: true,
    }
  }
}