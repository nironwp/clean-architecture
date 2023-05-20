import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";
import { FindCustomerUseCase } from "./find.customer.usecase";
const costumer = new Customer("1", "John Doe")
const address = new Address("Rua 1", 1234, "12345678","São Paulo")
costumer.changeAddress(address)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(costumer)),
        findAll:jest.fn(),
        create: jest.fn(),
        update: jest.fn(), 
    }
}
describe("Unit Test Find Customer Use Case", () => {

    it("should find customer by id", async () => {
        const customerRepository = MockRepository()
        const usecase = new FindCustomerUseCase(customerRepository)
        
        const input: InputFindCustomerDto= {
            id: "1"
        }

        const outputExpected: OutputFindCustomerDto = {
            address: {
                city: "São Paulo",
                number: 1234,
                street: "Rua 1",
                zip: "12345678"
            },
            id: "1",
            name: "John Doe"
        }
        const output = await usecase.execute(input)

        expect(output).toEqual(outputExpected)
    })
})