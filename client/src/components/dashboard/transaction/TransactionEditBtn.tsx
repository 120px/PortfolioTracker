import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import React from 'react'
import CreateTransactionModal from './CreateTransactionModal'

const TransactionEditBtn = (data: any) => {
    console.log(data)

    return (
        <Dialog>
            <div className='flex px-6 pt-4'>
                <DialogTrigger className='text-black'>edit</DialogTrigger>
            </div>
            <CreateTransactionModal></CreateTransactionModal>
        </Dialog>
    )
}

export default TransactionEditBtn