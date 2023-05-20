export interface InputUpdateProductDto {
    id: string
    name: string
    price: number
}

export interface OutputUpdateProductDto {
    product?: {
        id: string
        name: string
        price: number
    }
}