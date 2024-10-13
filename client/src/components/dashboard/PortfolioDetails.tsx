import { PortfolioActivityEnum } from '@/enums/PortfolioActivityEnum'
import React, { useState } from 'react'
import Holdings from './Holdings'
import Transactions from './Transactions'
import PortfolioTypeBtn from './PortfolioTypeBtn'
import { ITransaction } from '@/interfaces/ITransaction'

interface props {
    userData: ITransaction[]
}

const PortfolioDetails: React.FC<props> = ({userData}) => {
    const [portfolioActivityType, setPortfolioActivityType] = useState<PortfolioActivityEnum>(PortfolioActivityEnum.HOLDINGS)

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
            {portfolioActivityType == PortfolioActivityEnum.HOLDINGS ? <Holdings></Holdings>
                : <Transactions userData={userData}></Transactions>}

        </>
    )
}

export default PortfolioDetails