import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto"
import { CreateCustomerUseCase } from "./create.customer.usecase"

const input:InputCreateCustomerDto = {
    name: "John Doe",
    address: {
        street: "Rua 1",
        city: "São Paulo",
        number: 1234,
        zip: "12345678"
    }
} 


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test Create Customer Use Case", () => {
    it("should create a customer", async () => {
        const customerRepository = MockRepository()

        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)
        const output = await customerCreateUseCase.execute(input)
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                number: input.address.number,
                zip: input.address.zip
            }
        })
    })


    it("should throw an error when name is missing",  async () => {
        const customerRepository = MockRepository()
        input.name = undefined
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)
        const output = expect(async () =>await customerCreateUseCase.execute(input)).rejects.toThrow("Name is required")
    })

})