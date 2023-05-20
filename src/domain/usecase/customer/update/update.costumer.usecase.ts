
import CustomerRepositoryInterface from "../../../customer/repository/customer-repository.interface";
import Address from "../../../customer/value-object/address";
import { InputUpdateCostumerDto, OutputUpdateCostumerDto } from "./update.customer.dto";

export class UpdateCostumerUseCase {
    constructor(private repository: CustomerRepositoryInterface) {}

    async execute(input: InputUpdateCostumerDto) : Promise<OutputUpdateCostumerDto> {
        const customer = await this.repository.find(input.id)

        customer.changeName(input.name)
        customer.changeAddress(new Address(input.address.street, input.address.number, input.address.zip, input.address.city))

        await this.repository.update(customer)

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                number: customer.Address.number,
                zip: customer.Address.zip
            }
        }
    }
}