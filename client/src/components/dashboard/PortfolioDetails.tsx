import { PortfolioActivityEnum } from '@/enums/PortfolioActivityEnum'
import React, { useState } from 'react'
import Holdings from './Holdings'
import Transactions from './Transactions'

type Props = {}

const PortfolioDetails = (props: Props) => {
    const [portfolioActivityType, setPortfolioActivityType] = useState<PortfolioActivityEnum>(PortfolioActivityEnum.HOLDINGS)

    return (
        <>

            {portfolioActivityType == PortfolioActivityEnum.HOLDINGS ? <Holdings></Holdings>
                : <Transactions></Transactions>}

        </>
    )
}

export default PortfolioDetails