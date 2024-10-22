import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import IHolding from '@/interfaces/IHolding'
import { useUserHoldingsInformation } from '@/components/context/SetUserHoldingsInformation'
import { HoldingsType } from '@/enums/HoldingsTypesEnum'
import ITickerInformation from '@/interfaces/ITickerInformation'


interface props {
    userData: IHolding[]
    holdingsType: HoldingsType
}

const Holdings: React.FC<props> = ({ userData, holdingsType }) => {
    const { userHoldingsInformation, setUserHoldingsInformation } = useUserHoldingsInformation()

    const calculateProfitLoss = (tickerPrice: any, average_price: number) => {
        let percentage = ((tickerPrice - average_price) / tickerPrice) * 100
        return percentage.toFixed(2)
    }

    const displayData = () => {
        if (userData !== undefined) {
            return (
                userData.map((data, index) => (
                    <TableRow className='text-center' key={index}>
                        <TableCell className="text-center">{data.ticker.toLocaleUpperCase()}</TableCell>
                        <TableCell className="text-center">{displayTickerPrices(data.ticker)}</TableCell>
                        <TableCell className="text-center">{data.average_price}</TableCell>
                        {holdingsType == HoldingsType.OVERVIEW ? null : <>
                            <TableCell className="text-center">{data.num_of_shares}</TableCell>
                        </>
                        }
                        <TableCell className="text-center">{calculateProfitLoss(displayTickerPrices(data.ticker), data.average_price)}%</TableCell>
                    </TableRow>
                ))
            )
        }
    }

    const displayTickerPrices = (ticker: string) => {
        
        if (userHoldingsInformation !== undefined) {
            const tickerObj = userHoldingsInformation.find(obj =>
                obj.hasOwnProperty(ticker.toUpperCase())
            );

            if (tickerObj !== undefined)
                return tickerObj[ticker.toUpperCase()].ticker_price.toFixed(2)
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center">Average Price</TableHead>
                    {holdingsType == HoldingsType.OVERVIEW ? null : <>
                        <TableHead className="text-center">Num. of Shares</TableHead></>
                    }
                    <TableHead className="text-center">P&L</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {displayData()}
            </TableBody>
        </Table>
    )
}

export default Holdings