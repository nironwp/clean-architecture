
import CustomerRepositoryInterface from "../../../customer/repository/customer-repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export class FindCustomerUseCase {
    constructor(private repository: CustomerRepositoryInterface) {}

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto>{
        const customer = await this.repository.find(input.id)

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