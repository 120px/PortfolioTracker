import React from 'react'
import Main from './Main'
import { ITransaction } from '@/interfaces/ITransaction'
import IUserData from '@/interfaces/IUserData'

interface props {
  userData: IUserData
}

const Dashboard: React.FC<props> = ({ userData }) => {
  return (
    <>
      <Main userData={userData}></Main>
    </>
  )
}

export default Dashboard