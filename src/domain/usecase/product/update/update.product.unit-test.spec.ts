import { InputUpdateProductDto } from "./update.product.dto"
import { v4 as uuid } from 'uuid';
import { UpdateProductUseCase } from "./update.product.usecase";
import Product from "../../../product/entity/product";

const product = new Product(uuid(), 'Product A', 10)

const input:InputUpdateProductDto =  {
    id: product.id,
    name: "Product A (Black Friday)",
    price: 5
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll:jest.fn(),
        create: jest.fn(),
        update: jest.fn().mockReturnValue(Promise.resolve(new Product(input.id, input.name, input.price))), 
    }
}

describe("Unit Test Update Product Use Case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository()
        const usecase = new UpdateProductUseCase(productRepository)

        const output = await usecase.execute(input)

        expect(output.product).toBeDefined()
        
        if(!output.product) return
        
        expect(output.product.name).toEqual(input.name)
        expect(output.product.price).toEqual(input.price)
        expect(output.product.id).toEqual(input.id)
    })

    it("should not update a product when it not exists", async () => {
        const productRepository = MockRepository()
        productRepository.find = jest.fn().mockReturnValue(Promise.resolve(null))
        const usecase = new UpdateProductUseCase(productRepository)
        const output = await usecase.execute(input)

        expect(output.product).toBeUndefined()
    })
})