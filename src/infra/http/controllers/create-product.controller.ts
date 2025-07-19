import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { CreateProductUseCase } from "src/domain/products/application/use-cases/create-product";
import { ProductsAlreadyExistsError } from "src/domain/products/application/use-cases/errors/product-already-exists";
import { ZodValidationPipe } from "src/infra/pipes/zod-validation-pipe";
import z from "zod";

const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.number(),
  sku: z.string().min(1),
  description: z.string().optional(),
})

type CreateProductSchema = z.infer<typeof createProductSchema>;

const bodyValidationPipe = new ZodValidationPipe(createProductSchema);

@Controller("/products")
export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateProductSchema) {
    const { name, price, sku, description } = body;

    const result = await this.createProductUseCase.execute({
      name,
      price,
      sku,
      description,
    });

    if (result.isLeft()) {
      const error = result.value;

      if (error instanceof ProductsAlreadyExistsError) {
        throw new BadRequestException(error.message);
      }
      
      throw new BadRequestException()
    }
  }
}