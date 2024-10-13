import React, { useState } from 'react'
import ChartArea from './ChartArea'
import Holdings from "./Holdings"
import PortfolioDetails from './PortfolioDetails'
import { ITransaction } from '@/interfaces/ITransaction'

interface props{
    userData: ITransaction[]
}

const Main: React.FC<props> = ({userData}) => {

    return (
        <div className='m-4'>
            <ChartArea></ChartArea>
            <PortfolioDetails userData={userData}></PortfolioDetails>
        </div>
    )
}

export default Main