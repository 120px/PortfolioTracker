import { useState, useEffect } from 'react'
import './App.css'
import Authentication from './components/authentication/Authentication'
import Dashboard from './components/dashboard/Dashboard'
import axios from 'axios'
import { useUserData } from './components/context/SetUserDataContext'
import IUserData from './interfaces/IUserData'
import { useUserHoldingsInformation } from './components/context/SetUserHoldingsInformation'
import IChartData from './interfaces/IChartData'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userPortfolioValue, setUserPortfoilioValue] = useState(undefined)
  const { userData, setUserData } = useUserData()
  const [chartData, setChartData] = useState<IChartData | undefined>()
  const { userHoldingsInformation, setUserHoldingsInformation } = useUserHoldingsInformation()

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null)
      getUserData()
    if (isAuthenticated && localStorage.getItem("access_token") !== null) {
      fetchChartData()
    }
    return () => {

    }
  }, [isAuthenticated])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated && userData) {
        // Gets ticker prices of current holdings
        getTickerInformation(userData)
        calculateUserPortfolioValue(userData)
      }

    }, 3000);

    return () => {
      clearInterval(interval)
    }
  }, [userData])

  const fetchChartData = () => {
    let access_token = localStorage.getItem("access_token")
    axios.get("http://127.0.0.1:8000/userinformation/get_user_snapshot", {
      headers: { Authorization: `Bearer ${access_token}` }
    }).
      then((response) => {
        console.log(response.data)
        setChartData(response.data)
      })
  }

  const getUserData = () => {
    let access_token = localStorage.getItem("access_token")
    axios.get("http://127.0.0.1:8000/transactions/get_all_user_data/", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(async response => {
      if (response) {
        await setUserData(response.data)
        setIsAuthenticated(true)
      }
    })
  }

  const getTickerInformation = async (data: IUserData) => {
    let access_token = localStorage.getItem("access_token")
    let tickers = data.user_holdings.map(holding => holding.ticker).join(',');
    await axios.get("http://127.0.0.1:8000/yfinanceapi/search_stock/?action=get_ticker_information", {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      params: { tickers: tickers }
    }).then(async response => {
      setUserHoldingsInformation(response.data)
    })
  }

  const calculateUserPortfolioValue = async (data: IUserData) => {
    let access_token = localStorage.getItem("access_token")
    let tickers = data.user_holdings.map(holding => holding.ticker).join(' ');
    await axios.get("http://127.0.0.1:8000/userinformation/calculate_portfolio_value", {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      params: { tickers: tickers }
    }).then(async response => {
      setUserPortfoilioValue(response.data)
    })
  }

  return (
    <>
      {isAuthenticated == true && userData !== undefined ? <Dashboard userPortfolioValue={userPortfolioValue} chartData={chartData} userData={userData} />
        : <Authentication setIsAuthenticated={setIsAuthenticated} />}
    </>
  )
}

export default App

