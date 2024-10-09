import React, { useEffect, useState } from 'react'
import { AuthModeTypes } from '../../enums/AuthModeTypes'
import Login from './Login'
import Register from './Register'

interface props {
    setIsAuthenticated: React.Dispatch<boolean>
}

const Authentication: React.FC<props> = ({ setIsAuthenticated }) => {

    const [authMode, setAuthMode] = useState(AuthModeTypes.LOGIN)
    
    return (
        <>
            {authMode === AuthModeTypes.LOGIN ? <Login setAuthMode={setAuthMode}
                setIsAuthenticated={setIsAuthenticated} />
                : <Register setIsAuthenticated={setIsAuthenticated} setAuthMode={setAuthMode}></Register>}

        </>
    )
}

export default Authentication