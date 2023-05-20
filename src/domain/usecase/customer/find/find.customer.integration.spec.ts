import { Sequelize } from "sequelize-typescript"

import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";
import { FindCustomerUseCase } from "./find.customer.usecase";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../customer/entity/customer";
import Address from "../../../customer/value-object/address";
describe("Test Find Customer Use Case", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find customer by id", async () => {
        const customerRepository = new CustomerRepository()
        const costumer = new Customer("1", "John Doe")
        const address = new Address("Rua 1", 1234, "12345678","São Paulo")
        const usecase = new FindCustomerUseCase(customerRepository)
        costumer.changeAddress(address)

        customerRepository.create(costumer)
    

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

    it("should not find a customer", async () => {
        const customerRepository = new CustomerRepository()
        const usecase = new FindCustomerUseCase(customerRepository)

        const input: InputFindCustomerDto= {
            id: "123"
        }

        expect( async() => {
            return await usecase.execute(input)
        }).rejects.toThrow("Customer not found")


    })
})