import { Button } from '../ui/button'
import React from 'react'

interface props {
    setIsAuthenticated: React.Dispatch<boolean>
}

const Login: React.FC<props> = ({ setIsAuthenticated }) => {

    return (
        <>
            <Button>
                Login
            </Button>
        </>
    )
}

export default Login