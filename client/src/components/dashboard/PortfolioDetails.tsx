import { PortfolioActivityEnum } from '@/enums/PortfolioActivityEnum'
import React, { useState } from 'react'
import Holdings from './holdings/Holdings'
import Transactions from './transaction/Transactions'
import PortfolioTypeBtn from './PortfolioTypeBtn'
import IUserData from '@/interfaces/IUserData'

interface props {
    userData: IUserData
}

const PortfolioDetails: React.FC<props> = ({userData}) => {
    const [portfolioActivityType, setPortfolioActivityType] = useState<PortfolioActivityEnum>(PortfolioActivityEnum.HOLDINGS)
    console.log(userData)

    const createPortfolioTypeButtons = () => {
        return (Object.keys(PortfolioActivityEnum) as Array<keyof typeof PortfolioActivityEnum>).map((key, index) => (
            <PortfolioTypeBtn key={index} buttonName={key} setPortfolioActivityType={() => setPortfolioActivityType(PortfolioActivityEnum[key])} />
        ));
    };

    return (
        <>
            <div className='flex flex-row justify-between px-10 pb-4'>
                {createPortfolioTypeButtons()}
            </div>
            {portfolioActivityType == PortfolioActivityEnum.HOLDINGS && userData !== undefined ? 
            <Holdings userData={userData.user_holdings}></Holdings>
                : <Transactions userData={userData.user_transactions}></Transactions>}

        </>
    )
}

export default PortfolioDetails