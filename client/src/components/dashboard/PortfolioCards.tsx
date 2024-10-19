import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '../ui/card'
import IUserGeneralInformation from '@/interfaces/IUserGeneralInformation'

interface props {
    userData: IUserGeneralInformation
}

const PortfolioCards: React.FC<props> = ({ userData }) => {
    console.log("port: " + userData)
    return (
        <div className='w-full flex flex-row gap-5'>
            <Card className='w-1/4' >
                <CardHeader className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>Total contribution</CardHeader>
                <CardContent className='text-2xl font-bold'>{
                    userData.total_contribution !== undefined ? `$ ${userData.total_contribution}` : null}
                    <p className='text-xs text-muted-foreground font-normal'>Contributed X this month</p>
                </CardContent>
            </Card>
            <Card className='w-1/4' >
                <CardHeader>Portfolio Value</CardHeader>
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