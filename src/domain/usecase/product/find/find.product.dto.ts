export class InputFindProductDto {
    id: string
}

export class OutputFindProductDto {
    product?: {
        id: string
        name: string
        price: number
    }
}