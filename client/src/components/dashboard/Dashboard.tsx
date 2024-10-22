import React from 'react'
import Main from './Main'
import { ITransaction } from '@/interfaces/ITransaction'
import IUserData from '@/interfaces/IUserData'

interface props {
  userData: IUserData
  userPortfolioValue: number | undefined
}

const Dashboard: React.FC<props> = ({ userData, userPortfolioValue}) => {
  return (
    <>
      <Main userPortfolioValue={userPortfolioValue} userData={userData}></Main>
    </>
  )
}

export default Dashboard