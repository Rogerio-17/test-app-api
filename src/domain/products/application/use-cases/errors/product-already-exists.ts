import type { UseCaseError } from "src/core/errors/use-case-error";


export class ProductsAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('Product already exists.')
  }
}
