import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import IHolding from '@/interfaces/IHolding'
import { useUserHoldingsInformation } from '@/components/context/SetUserHoldingsInformation'

interface props {
    userData: IHolding[]
}

const Holdings: React.FC<props> = ({userData}) => {
    const { userHoldingsInformation, setUserHoldingsInformation } = useUserHoldingsInformation()

    const displayData = (data: IHolding) => {
        if (userData !== undefined) {
            return (
                userData.map((data, index) => (
                    <TableRow className='text-center' key={index}>
                        <TableCell className="text-center">{data.ticker.toLocaleUpperCase()}</TableCell>
                        <TableCell className="text-center">{data.average_price}</TableCell>
                        <TableCell className="text-center">{data.num_of_shares}</TableCell>
                        <TableCell className="text-center">$ 23</TableCell>
                    </TableRow>
                ))
            )
        }

    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Average Price</TableHead>
                    <TableHead className="text-center">Num. of Shares</TableHead>
                    <TableHead className="text-center">P&L</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {displayData(userData)}
            </TableBody>
        </Table>
    )
}

export default Holdings