import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { ITransaction } from '@/interfaces/ITransaction'

interface props {
    userData: ITransaction[]
}

const TransactionTable: React.FC<props> = ({ userData }) => {

    const displayData = () => {
        if (userData !== undefined) {
            return (
                userData.map((data, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-center">{data.type}</TableCell>
                        <TableCell className="text-center">{data.stock_name.toLocaleUpperCase()}</TableCell>
                        <TableCell className="text-center">{data.num_of_shares}</TableCell>
                        <TableCell className="text-center">$ {data.cost}</TableCell>
                    </TableRow>
                ))
            )
        }

    }

    return (
        <Table className=''>
            <TableHeader>
                <TableRow className=''>
                    <TableHead className="text-center">Type</TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Num. of Shares</TableHead>
                    <TableHead className="text-center">Cost</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {displayData()}
            </TableBody>
        </Table>
    )
}

export default TransactionTable