import React, { useState } from 'react'
import ChartArea from './ChartArea'
import PortfolioDetails from './PortfolioDetails'
import IUserData from '@/interfaces/IUserData'
import Header from '../header/Header'
import { PortfolioActivityEnum } from '@/enums/PortfolioActivityEnum'
import PortfolioTypeBtn from './PortfolioTypeBtn'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Label } from 'recharts'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import PortfolioCards from './PortfolioCards'
import Holdings from './holdings/Holdings'
import Transactions from './transaction/Transactions'
import { HoldingsType } from '@/enums/HoldingsTypesEnum'

interface props {
    userData: IUserData
    userPortfolioValue: number | undefined
}

const Main: React.FC<props> = ({ userData, userPortfolioValue }) => {
    const [holdingsType, setHoldingsType] = useState<HoldingsType>(HoldingsType.OVERVIEW)

    const handleHoldingsType = (type: HoldingsType) => {
        setHoldingsType(type)
    }

    return (
        <div className='flex flex-col px-10'>
            <Header></Header>
            <Tabs defaultValue="overview" className="w-[100%]">
                <TabsList>
                    <TabsTrigger value="overview" onClick={() => handleHoldingsType(HoldingsType.OVERVIEW)} >Overview</TabsTrigger>
                    <TabsTrigger value="holdings" onClick={() => handleHoldingsType(HoldingsType.DETAILED)} >Holdings</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <PortfolioCards userPortfolioValue={userPortfolioValue} userData={userData.user_general_information}></PortfolioCards>
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-row gap-5 px-0">
                        <Card className='w-3/4'>
                            <TabsList className='h-8 text-sm'>
                                <TabsTrigger value="15D">15D</TabsTrigger>
                                <TabsTrigger value="">3M</TabsTrigger>
                                <TabsTrigger value="">6M</TabsTrigger>
                                <TabsTrigger value="">All</TabsTrigger>
                            </TabsList>
                            <ChartArea></ChartArea>
                        </Card>
                        <Card className='w-1/2'>
                            <Holdings holdingsType={holdingsType} userData={userData.user_holdings}></Holdings>
                        </Card>
                    </CardContent>
                </TabsContent>
                <TabsContent value="holdings">
                    <Card className='w-full' >
                        <Holdings holdingsType={holdingsType} userData={userData.user_holdings}></Holdings>
                    </Card>
                </TabsContent>
                <TabsContent value="transactions">
                    <Card className='w-full'>
                        <Transactions userData={userData !== undefined ? userData.user_transactions : null}></Transactions>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Main