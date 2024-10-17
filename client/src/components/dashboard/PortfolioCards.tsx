import React from 'react'
import { Card, CardHeader } from '../ui/card'

const PortfolioCards = () => {
    return (
        <div className='w-full flex flex-row gap-5'>
            <Card className='w-1/4' >
                <CardHeader>Portfolio Value</CardHeader>
            </Card>
            <Card className='w-1/4' >
                <CardHeader>Total contribution</CardHeader>
            </Card>
            <Card className='w-1/4' >
                <CardHeader>Total P&L</CardHeader>
            </Card>
            <Card className='w-1/4' >
                <CardHeader>Total P&L</CardHeader>
            </Card>
        </div>
    )
}

export default PortfolioCards