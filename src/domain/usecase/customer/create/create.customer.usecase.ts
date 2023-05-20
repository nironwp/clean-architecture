
import CustomerFactory from "../../../customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../customer/repository/customer-repository.interface";
import Address from "../../../customer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import { v4 as uuid } from 'uuid';

export class CreateCustomerUseCase {
    constructor(private repository: CustomerRepositoryInterface) {}

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto>{
        const customer = CustomerFactory.createWithAddress(input.name, 
            new Address(input.address.street,input.address.number, input.address.zip, input.address.city)
        )

        await this.repository.create(customer)
        return {
            address: {
                city: customer.Address.city,
                number: customer.Address.number,
                street: customer.Address.street,
                zip: customer.Address.zip
            },
            id: customer.id,
            name: customer.name
        }
    
    }
}