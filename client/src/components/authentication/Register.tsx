
import React from 'react'
import RegisterBtn from './RegisterBtn'
import AuthProps from '../../interfaces/AuthProps'
import { Button } from '@mui/material'
import { AuthModeTypes } from '../../enums/AuthModeTypes'

const Register: React.FC<AuthProps> = ({setIsAuthenticated, setAuthMode}) => {
  return (
    <>
        <RegisterBtn setIsAuthenticated={setIsAuthenticated}></RegisterBtn>
        <Button onClick={() => setAuthMode(AuthModeTypes.LOGIN)}>
            Login
        </Button>
    </>
  )
}

export default Register