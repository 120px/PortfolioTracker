import React from 'react'
import AuthProps from "../../interfaces/AuthProps"
import { Button } from '@mui/material';

interface props{
    setIsAuthenticated: React.Dispatch<boolean>
}

const Register: React.FC<props> = ({ setIsAuthenticated }) => {

    const handleSubmit = async () => {
        const response = await fetch('http://127.0.0.1:8000/authentication/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": "user",
                "password": "123"
            }),
        });
    }

    return (
        <>
            <Button variant="contained" color="info" onClick={() => handleSubmit()}>
                Register
            </Button>
        </>
    )
}

export default Register