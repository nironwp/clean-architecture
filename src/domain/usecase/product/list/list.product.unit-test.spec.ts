
import { InputListProductDto } from "./list.product.dto"
import { v4 as uuid } from 'uuid';
import { ListProductUseCase } from "./list.product.usecase";
import Product from "../../../product/entity/product";

const product1 = new Product(uuid(), 'Product A', 10)
const product2 = new Product(uuid(), 'Product B', 20)

const input:InputListProductDto =  {
    
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll:jest.fn(),
        create: jest.fn(),
        update: jest.fn(), 
    }
}

describe("Unit Test List Product Use Case", () => {
    it("Should list a products", async () => {
        const productRepository = MockRepository()
        productRepository.findAll = jest.fn().mockReturnValue(Promise.resolve([product1, product2]))

        const usecase = new ListProductUseCase(productRepository)
        const output = await usecase.execute(input)

        expect(output.products[0].id).toEqual(product1.id)
        expect(output.products[1].id).toEqual(product2.id)
        expect(output.products[0].name).toEqual(product1.name)
        expect(output.products[1].name).toEqual(product2.name)
        expect(output.products[0].price).toEqual(product1.price)
        expect(output.products[1].price).toEqual(product2.price)
    
    })
})
