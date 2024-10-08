import React from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

interface props {
    setIsAuthenticated: React.Dispatch<boolean>
}

const Register: React.FC<props> = ({setIsAuthenticated}) => {

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

        // if (await response.ok){
        //     setIsAuthenticated(false)
        // }
    }

    return (
        <div>
            <Button variant="contained" color="info" onClick={() => handleSubmit()}>
                Register
            </Button>
        </div>
    )
}

export default Register