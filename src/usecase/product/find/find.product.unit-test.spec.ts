import Product from "../../../domain/product/entity/product"
import { InputFindProductDto } from "./find.product.dto"
import { v4 as uuid } from 'uuid';
import { FindProductUseCase } from "./find.product.usecase";

const product = new Product(uuid(), 'Product A', 10)

const input:InputFindProductDto =  {
    id: product.id
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll:jest.fn(),
        create: jest.fn(),
        update: jest.fn(), 
    }
}

describe("Unit Test Find Product Use Case", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository()
        const usecase = new FindProductUseCase(productRepository)

        const output = await usecase.execute(input)

        expect(output).toBeDefined()

        if(!output.product) return

        expect(output.product.name).toEqual(product.name)
        expect(output.product.price).toEqual(product.price)
        expect(output.product.id).toEqual(product.id)
    })

    it("should not find a product when it not exists", async () => {
        const productRepository = MockRepository()
        productRepository.find = jest.fn().mockReturnValue(Promise.resolve(null))
        const usecase = new FindProductUseCase(productRepository)
        const output = await usecase.execute(input)

        expect(output.product).toBeUndefined()
    })
})