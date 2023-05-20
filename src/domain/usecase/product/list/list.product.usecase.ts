
import ProductRepositoryInterface from "../../../product/repository/product-repository.interface";
import { InputListProductDto, ListProductOutputDto } from "./list.product.dto";


export class ListProductUseCase {
    constructor(private repository: ProductRepositoryInterface) {}

    async execute(input: InputListProductDto) : Promise<ListProductOutputDto> {
        const products = await this.repository.findAll();
        return {
            products: products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                }
            })
        }
    }
}