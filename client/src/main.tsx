import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserDataProvider } from './components/context/SetUserDataContext.tsx'
import { UserHoldingsProvider } from './components/context/SetUserHoldingsInformation.tsx'

createRoot(document.getElementById('root')!).render(
  <UserHoldingsProvider>
    <UserDataProvider>
      <App />
    </UserDataProvider>
  </UserHoldingsProvider>
)
