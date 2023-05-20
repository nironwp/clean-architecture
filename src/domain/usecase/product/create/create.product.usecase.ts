
import Product from '../../../product/entity/product';
import ProductRepositoryInterface from '../../../product/repository/product-repository.interface';
import { InputCreateProductDto, OutputCreateProductDto } from './create.product.dto';
import { v4 as uuid } from 'uuid';

export class CreateProductUseCase {
    constructor(private repository: ProductRepositoryInterface) {}

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const id =uuid()
        await this.repository.create(new Product(id, input.name, input.price));
        return {
            id:id,
            name: input.name,
            price: input.price,
        };
    }
}