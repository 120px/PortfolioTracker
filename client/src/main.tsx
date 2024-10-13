import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserDataProvider } from './components/context/SetUserDataContext.tsx'

createRoot(document.getElementById('root')!).render(
  <UserDataProvider>
    <App />
  </UserDataProvider>
)
