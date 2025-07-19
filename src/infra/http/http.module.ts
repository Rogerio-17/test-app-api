import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module';
import { CreateProductController } from './controllers/create-product.controller';
import { UpdateProductByIdController } from './controllers/update-product-by-id.controller';
import { DeleteProductByIdController } from './controllers/delete-product-by-id.controller';
import { FetchProductsController } from './controllers/fetch-products.controller';
import { GetProductByIdController } from './controllers/get-product-by-id.controller';
import { CreateProductUseCase } from 'src/domain/products/application/use-cases/create-product';
import { UpdateProductByIdUseCase } from 'src/domain/products/application/use-cases/update-product-by-id';
import { DeleteProductByIdUseCase } from 'src/domain/products/application/use-cases/delete-product-by-id';
import { FetchProductsUseCase } from 'src/domain/products/application/use-cases/fetch-products';
import { GetProductByIdUseCase } from 'src/domain/products/application/use-cases/get-products-by-id';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    CreateProductController,
    UpdateProductByIdController,
    DeleteProductByIdController,
    FetchProductsController,
    GetProductByIdController,
  ],
  providers: [
    CreateProductUseCase,
    UpdateProductByIdUseCase,
    DeleteProductByIdUseCase,
    FetchProductsUseCase,
    GetProductByIdUseCase,
  ],
})
export class HttpModule {}
