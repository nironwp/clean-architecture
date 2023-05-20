import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import { UpdateCostumerUseCase } from "./update.costumer.usecase";
import { InputUpdateCostumerDto } from "./update.customer.dto";

const customer = 
CustomerFactory.createWithAddress(
    "John Doe", 
    new Address(
    "Rua 1",
    1234,
    "12345678",
    "São Paulo"
))



const input:InputUpdateCostumerDto = {
    id: customer.id,
    name: "John",  
    address: {
        city: "São Paulo",
        number: 1234,
        street: "Rua 1",
        zip: "12345678"
    }
}


const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll:jest.fn(),
        create: jest.fn(),
        update: jest.fn().mockReturnValue(Promise.resolve(input)), 
    }
}

describe("Unit Test Update Customer use case", () => {
    it("should update an costumer" , async () => {

        const customerRepository = MockRepository()
        const costumerUpdateUseCase = new UpdateCostumerUseCase(customerRepository)
        const output = await costumerUpdateUseCase.execute(input)

        expect(output).toEqual(input)
    })
})