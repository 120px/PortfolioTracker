import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

const Holdings = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Name</TableHead>
                    <TableHead>Average Price</TableHead>
                    <TableHead>P&L</TableHead>
                    <TableHead className="text-right">Num. of Shares</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                </TableRow>
                <TableRow>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default Holdings