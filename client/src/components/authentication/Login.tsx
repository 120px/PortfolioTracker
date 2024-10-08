import Button from '@mui/material/Button';
import React from 'react'

interface props {
    setIsAuthenticated: React.Dispatch<boolean>
}

const Login: React.FC<props> = ({setIsAuthenticated}) => {

    const handleSubmit = async () => {
        const response = await fetch('http://127.0.0.1:8000/authentication/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: "user",
                password: "123"
            }),
        });

        const data = await response.json()
        if (response.ok) {
            localStorage.setItem("access_token", data.access)
            setIsAuthenticated(true)
        }else{
            console.log("Error with logging in")
        }
    }

    return (
        <div>
            <Button variant="contained" color="info" onClick={() => handleSubmit()}>
                Login
            </Button>
        </div>
    )
}

export default Login