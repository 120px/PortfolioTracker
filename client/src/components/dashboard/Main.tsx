import React, { useState } from 'react'
import ChartArea from './ChartArea'
import Holdings from "./holdings/Holdings"
import PortfolioDetails from './PortfolioDetails'
import { ITransaction } from '@/interfaces/ITransaction'
import IUserData from '@/interfaces/IUserData'

interface props{
    userData: IUserData
}

const Main: React.FC<props> = ({userData}) => {
    return (
        <div className=''>
            <ChartArea></ChartArea>
            <PortfolioDetails userData={userData}></PortfolioDetails>
        </div>
    )
}

export default Main