export interface ITransaction {
    type: string,
    name: string,
    date: Date,
    average_price: number,
    num_of_shares: number,
    cost: number
}