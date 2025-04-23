import React from 'react'
import Main from './Main'
import { ITransaction } from '@/interfaces/ITransaction'
import IUserData from '@/interfaces/IUserData'
import IChartData from '@/interfaces/IChartData'

interface props {
  userData: IUserData
  userPortfolioValue: number | undefined
  chartData: IChartData | undefined
}

const Dashboard: React.FC<props> = ({ userData, userPortfolioValue, chartData }) => {
  return (
    <>
      <Main userPortfolioValue={userPortfolioValue} userData={userData} chartData={chartData}></Main >
    </>
  )
}

export default Dashboard