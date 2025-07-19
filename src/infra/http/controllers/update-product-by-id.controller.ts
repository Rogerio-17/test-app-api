import { BadRequestException, Body, Controller, Param, Put } from "@nestjs/common";
import { ProductPresenter } from "../presenter/product-presenter";
import { UpdateProductByIdUseCase } from "src/domain/products/application/use-cases/update-product-by-id";
import z, { success } from "zod";
import { ZodValidationPipe } from "src/infra/pipes/zod-validation-pipe";

const editProductBodySchema = z.object({
  name: z.string().min(1),
  price: z.number(),
  sku: z.string().min(1),
  description: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(editProductBodySchema)

type EditProductBodySchema = z.infer<typeof editProductBodySchema>

@Controller("/products/:id")
export class UpdateProductByIdController {
  constructor(private updateProductByIdUseCase: UpdateProductByIdUseCase) {}

  @Put()
  async handle(
    @Body(bodyValidationPipe) body: EditProductBodySchema,
    @Param('id') productId: string,
  ) {
    const { name, price, sku, description } = body;
    
    const result = await this.updateProductByIdUseCase.execute({
      productId,
      name,
      price,
      sku,
      description,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      success: true,
    }
  }
}