import { PortfolioActivityEnum } from '@/enums/PortfolioActivityEnum'
import React, { useState } from 'react'
import Holdings from './holdings/Holdings'
import Transactions from './transaction/Transactions'
import IUserData from '@/interfaces/IUserData'

interface props {
    userData: IUserData,
    portfolioActivityType: PortfolioActivityEnum
}

const PortfolioDetails: React.FC<props> = ({ userData, portfolioActivityType }) => {

    return (
        <>
            <div className='flex flex-col'>

                {portfolioActivityType == PortfolioActivityEnum.HOLDINGS && userData !== undefined ?
                    <Holdings userData={userData.user_holdings}></Holdings>
                    : <Transactions userData={userData.user_transactions}></Transactions>}
            </div>
        </>
    )
}

export default PortfolioDetails