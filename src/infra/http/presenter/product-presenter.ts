
export class ProductPresenter {
  static toHTTP(product: any) {
    return {
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        sku: product.sku,
        description: product.description,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt ? product.updatedAt.toISOString() : null,
    };
  }
}