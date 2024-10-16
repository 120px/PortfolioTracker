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

    return (
        <div className='m-5'>
            <div className='flex flex-col'>
                <Header></Header>
                <Tabs defaultValue="account" className="w-[100%] mx-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="holdings">Holdings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-row gap-5">
                            <Card className='w-3/4'>
                                <ChartArea></ChartArea>
                            </Card>
                            <Card className='w-1/2'>
                                <PortfolioDetails portfolioActivityType={portfolioActivityType} userData={userData}></PortfolioDetails>
                            </Card>
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="holdings">
                        <Card>

                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Main