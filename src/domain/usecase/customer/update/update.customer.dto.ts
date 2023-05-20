export class InputUpdateCostumerDto {
    id: string
    name: string
    address: {
        street: string
        city: string
        number: number
        zip: string
    }
}

export class OutputUpdateCostumerDto {
    id: string
    name: string
    address: {
        street: string
        city: string
        number: number
        zip: string
    }
}