import React from 'react'
import CreateTransactionModal from './CreateTransactionModal'
import TransactionTable from './TransactionTable'
import { ITransaction } from '@/interfaces/ITransaction'

interface props {
  userData: ITransaction[]
}

const TransactionHistory: React.FC<props> = ({userData}) => {
  return (
    <div className='flex flex-col'>
      <CreateTransactionModal></CreateTransactionModal>
      <TransactionTable userData={userData}></TransactionTable>
    </div>
  )
}

export default TransactionHistory