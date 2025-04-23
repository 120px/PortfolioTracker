import IHolding from "./IHolding"
import { ITransaction } from "./ITransaction"
import IUserGeneralInformation from "./IUserGeneralInformation"

export default interface IUserData{
    user_holdings: IHolding[],
    user_transactions: ITransaction[],
    user_general_information: IUserGeneralInformation
}