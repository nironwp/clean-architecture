export class InputListCustomerDto {
}

interface Customer {
    id: string
    name: string
    address: {
        street: string
        city: string
        number: number
        zip: string
    }
}

export class OutputListCostumerDto {
    customers: Customer[]
}