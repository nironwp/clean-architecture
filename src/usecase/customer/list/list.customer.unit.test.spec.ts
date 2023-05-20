import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import { InputListCustomerDto, OutputListCostumerDto } from "./list.customer.dto"
import { ListCustomerUseCase } from "./list.customer.usecase"

const customer1 = 
CustomerFactory.createWithAddress(
    "John Doe", 
    new Address(
    "Rua 1",
    1234,
    "12345678",
    "São Paulo"
))

const customer2 = 
CustomerFactory.createWithAddress(
    "John", 
    new Address(
    "Rua 2",
    1234,
    "123456789",
    "São Paulo"
))



const input:InputListCustomerDto = {

}


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll:jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn().mockReturnValue(Promise.resolve(input)), 
    }
}


describe("Unit Test List Customer Use Case", () => {
    it("should list all customers", async () => {
        const customerRepository = MockRepository()
        const usecase = new ListCustomerUseCase(customerRepository)

        const output: OutputListCostumerDto = await usecase.execute(input)

        expect(output.customers[0].id).toEqual(customer1.id)
        expect(output.customers[1].id).toEqual(customer2.id)
        expect(output.customers[0].name).toEqual(customer1.name)
        expect(output.customers[1].name).toEqual(customer2.name)
        expect(output.customers[0].address.city).toEqual(customer1.Address.city)
        expect(output.customers[1].address.city).toEqual(customer2.Address.city)
        expect(output.customers[0].address.number).toEqual(customer1.Address.number)
        expect(output.customers[1].address.number).toEqual(customer2.Address.number)
        expect(output.customers[0].address.street).toEqual(customer1.Address.street)
        expect(output.customers[1].address.street).toEqual(customer2.Address.street)
        expect(output.customers[0].address.zip).toEqual(customer1.Address.zip)
        expect(output.customers[1].address.zip).toEqual(customer2.Address.zip)

    })
})