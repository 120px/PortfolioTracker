import React from 'react'
import { Button } from '../ui/button'
import TransactionHistory from './TransactionHistory'
import { ITransaction } from '@/interfaces/ITransaction'

interface props{
  userData: ITransaction[]
}

const Transactions:React.FC<props> = ({userData}) => {
  return (
    <>
        <TransactionHistory userData={userData}></TransactionHistory>
    </>
  )
}

export default Transactions