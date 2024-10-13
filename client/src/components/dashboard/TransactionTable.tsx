import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { ITransaction } from '@/interfaces/ITransaction'

interface props {
    userData: ITransaction[]
}

const TransactionTable: React.FC<props> = ({ userData }) => {
    const [transactionData, setTransactionData] = useState()

    const organizeData = () => {
        let organizedData

    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Type</TableHead>
                    <TableHead className="">Name</TableHead>
                    <TableHead>Average Price</TableHead>
                    <TableHead className="text-right">Num. of Shares</TableHead>
                    <TableHead>Cost</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {userData.map((data, index) => (
                    <TableRow key={index}>
                        <TableCell className="">{data.name}</TableCell>
                        <TableCell className="">{data.average_price}</TableCell>
                        <TableCell className="">{data.type}</TableCell>
                        <TableCell className="">{data.name}</TableCell>
                        <TableCell className="">{data.cost}</TableCell>
                    </TableRow> 
                ))}
            </TableBody>
        </Table>
    )
}

export default TransactionTable