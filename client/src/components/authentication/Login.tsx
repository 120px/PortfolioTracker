import { Button, TextField } from '@mui/material'
import React from 'react'
import LoginBtn from './LoginBtn'
import AuthProps from "../../interfaces/AuthProps"
import { AuthModeTypes } from '../../enums/AuthModeTypes'

const Login: React.FC<AuthProps> = ({ setAuthMode, setIsAuthenticated }) => {
    return (
        <>
            <LoginBtn setIsAuthenticated={setIsAuthenticated}></LoginBtn>
            <Button onClick={() => setAuthMode(AuthModeTypes.REGISTER)}>
                Register
            </Button>
        </>
    )
}

export default Login