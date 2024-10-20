import { useState, useEffect } from 'react'
import './App.css'
import Authentication from './components/authentication/Authentication'
import Dashboard from './components/dashboard/Dashboard'
import axios from 'axios'
import { useUserData } from './components/context/SetUserDataContext'
import IUserData from './interfaces/IUserData'
import { useUserHoldingsInformation } from './components/context/SetUserHoldingsInformation'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { userData, setUserData } = useUserData();
  const { userHoldingsInformation, setUserHoldingsInformation } = useUserHoldingsInformation()

  useEffect(() => {
    if (isAuthenticated && localStorage.getItem("access_token") !== null) {
      getUserData()
    }
    return () => {

    }
  }, [isAuthenticated])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated && userData) {
        // getTickerInformation(userData)
      }

    }, 3000);

    return () => {
      clearInterval(interval)
    }
  }, [userData])

  const getUserData = () => {
    let access_token = localStorage.getItem("access_token")
    axios.get("http://127.0.0.1:8000/transactions/get_all_user_data/", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(async response => {
      await setUserData(response.data)
    })
  }

  const getTickerInformation = async (data: IUserData) => {
    let access_token = localStorage.getItem("access_token")
    let tickers = data.user_holdings.map(holding => holding.ticker).join(' ');
    await axios.get("http://127.0.0.1:8000/yfinanceapi/search_stock/?action=get_ticker_information", {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      params: { tickers: tickers }
    }).then(async response => {
      setUserHoldingsInformation(response.data)
    })
  }

  return (
    <>
      {isAuthenticated == true && userData !== undefined ? <Dashboard userData={userData} /> : <Authentication setIsAuthenticated={setIsAuthenticated} />}
    </>
  )
}

export default App
