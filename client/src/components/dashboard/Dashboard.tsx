import React from 'react'
import Main from './Main'
import { ITransaction } from '@/interfaces/ITransaction'

interface props {
  userData: ITransaction
}

const Dashboard: React.FC<props> = ({userData}) => {
  return (
    <>
        <Main userData={userData}></Main>
    </>
  )
}

export default Dashboard