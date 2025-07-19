import type { Optional } from "@prisma/client/runtime/library"
import { Entity } from "src/core/entities/entity"
import type { UniqueEntityID } from "src/core/entities/unique-entity-id"

export interface ProductProps {
  sku: string
  name: string
  price: number
  description?: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Product extends Entity<ProductProps> {
  get sku() {
    return this.props.sku
  }

  get name() {
    return this.props.name
  }

  get price() {
    return this.props.price
  }

  get description() {
    return this.props.description
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  public update(
      props: Optional<
      ProductProps,
      'createdAt' | 'updatedAt' 
    >,
  ) {
    this.props.sku = props.sku
    this.props.name = props.name
    this.props.price = props.price
    this.props.description = props.description

    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<ProductProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    const product = new Product(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    )

    return product
  }
}
