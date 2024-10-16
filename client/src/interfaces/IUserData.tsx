import IHolding from "./IHolding"
import { ITransaction } from "./ITransaction"

export default interface IUserData{
    user_holdings: IHolding[],
    user_transactions: ITransaction[]
}