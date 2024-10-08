import React from 'react'
import Login from './Login'
import Register from './Register'

interface props {
    setIsAuthenticated: React.Dispatch<boolean>
}

const Authentication: React.FC<props> = ({setIsAuthenticated}) => {
    return (
        <div>
            <Login setIsAuthenticated={setIsAuthenticated}/>
            <Register setIsAuthenticated={setIsAuthenticated}/>
        </div>
    )
}

export default Authentication