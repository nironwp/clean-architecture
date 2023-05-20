
import ProductFactory from '../../../product/factory/product.factory';
import { InputCreateProductDto } from './create.product.dto';
import { CreateProductUseCase } from './create.product.usecase';
const product = ProductFactory.create('a', 'Product A', 10);


const input:InputCreateProductDto = {
    name: product.name,
    price: product.price 
}


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll:jest.fn(),
        create: jest.fn(),
        update: jest.fn(), 
    }
}

describe("Unit Test Create Product Use Case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository()
        const usecase = new CreateProductUseCase(productRepository)

        const output = await usecase.execute(input)

        expect(output.name).toEqual(input.name)
        expect(output.price).toEqual(input.price)
        expect(output.id).toBeDefined()
    })
})