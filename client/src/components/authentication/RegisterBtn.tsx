import React from 'react'
import AuthProps from "../../interfaces/AuthProps"
import { Button } from '../ui/button'

interface props {
    setIsAuthenticated: React.Dispatch<boolean>
}

const Register: React.FC<props> = ({ setIsAuthenticated }) => {

    return (
        <>
            <Button>
                Register
            </Button>
        </>
    )
}

export default Register