
import CustomerRepositoryInterface from "../../../customer/repository/customer-repository.interface";
import { InputListCustomerDto, OutputListCostumerDto } from "./list.customer.dto";

export class ListCustomerUseCase {
    constructor(private repository: CustomerRepositoryInterface) {}

    async execute(input: InputListCustomerDto) : Promise<OutputListCostumerDto> {
        const customers = await this.repository.findAll()

        return {
            customers: customers.map(customer => {
                return {
                    id: customer.id,
                    name: customer.name,
                    address: {
                        city: customer.Address.city,
                        number: customer.Address.number,
                        street: customer.Address.street,
                        zip: customer.Address.zip
                    }
                }
            })
        }
    }
}