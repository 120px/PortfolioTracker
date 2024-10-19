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

interface props {
    userData: IUserData
}

const Main: React.FC<props> = ({ userData }) => {
    const [portfolioActivityType, setPortfolioActivityType] = useState<PortfolioActivityEnum>(PortfolioActivityEnum.HOLDINGS)

    const createPortfolioTypeButtons = () => {

        return (Object.keys(PortfolioActivityEnum) as Array<keyof typeof PortfolioActivityEnum>).map((key, index) => (
            <PortfolioTypeBtn key={index} buttonName={key} setPortfolioActivityType={() => setPortfolioActivityType(PortfolioActivityEnum[key])} />
        ));
    };

    const handleHoldingsClick = () => {

    }

    return (
        <div className='flex flex-col px-10'>
            {/* <Header></Header> */}
            <Tabs defaultValue="account" className="w-[100%]">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="holdings" onClick={handleHoldingsClick()}>Holdings</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <PortfolioCards userData={userData.user_general_information}></PortfolioCards>
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-row gap-5 px-0">
                        <Card className='w-3/4'>
                            <ChartArea></ChartArea>
                        </Card>
                        <Card className='w-1/2'>
                            <Holdings userData={userData.user_holdings}></Holdings>
                        </Card>
                    </CardContent>
                </TabsContent>
                <TabsContent value="holdings">
                    <Card className='w-full'>
                        <Holdings userData={userData.user_holdings}></Holdings>
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