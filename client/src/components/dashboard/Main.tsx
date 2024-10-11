import React, { useState } from 'react'
import ChartArea from './ChartArea'
import Holdings from "./Holdings"
import PortfolioDetails from './PortfolioDetails'

const Main = () => {

    return (
        <div className='m-4'>
            <ChartArea></ChartArea>
            <PortfolioDetails></PortfolioDetails>
        </div>
    )
}

export default Main