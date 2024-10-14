import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'

const Holdings = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Name</TableHead>
                    <TableHead>Average Price</TableHead>
                    <TableHead >Num. of Shares</TableHead>
                    <TableHead className="text-right">P&L</TableHead>
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