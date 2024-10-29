import React, { useEffect } from 'react'
import CreateTransactionModal from './CreateTransactionModal'
import TransactionTable from './TransactionTable'
import { ITransaction } from '@/interfaces/ITransaction'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

interface props {
  userData: ITransaction[]
}

const TransactionHistory: React.FC<props> = ({ userData }) => {

  return (
    <div className='flex flex-col'>
      <div className='mb-6'>
        <Dialog>
          <div className='flex w-full justify-center px-6 pt-4'>
            <DialogTrigger className='w-44 h-12 flex justify-center items-center text-black bg-white border border-gray-300 rounded-full shadow-lg hover:bg-gray-100'>Add transaction</DialogTrigger>
          </div>
          <CreateTransactionModal></CreateTransactionModal>
        </Dialog>
      </div>
      <TransactionTable userData={userData}></TransactionTable>
    </div>
  )
}

export default TransactionHistory