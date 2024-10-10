import React, { useEffect, useState } from 'react'
import { AuthModeTypes } from '../../enums/AuthModeTypes'
import Login from './Login'
import Register from './Register'
import Prism from '../threejs/Prism'

interface props {
    setIsAuthenticated: React.Dispatch<boolean>
}

const Authentication: React.FC<props> = ({ setIsAuthenticated }) => {

    const [authMode, setAuthMode] = useState(AuthModeTypes.LOGIN)

    return (
        <div className='flex flex-col'>

            <div className='mx-auto'>
                <Prism></Prism>
                <h1 className='text-center text-4xl font-bold'>Prysm</h1>
            </div>

            <div className='flex justify-center max-h-max pt-4'>
                <div className='w-72 border-2 border-gray-800 rounded-md p-8'>
                    {authMode === AuthModeTypes.LOGIN ? (
                        <Login setAuthMode={setAuthMode} setIsAuthenticated={setIsAuthenticated} />
                    ) : (
                        <Register setIsAuthenticated={setIsAuthenticated} setAuthMode={setAuthMode} />
                    )}
                </div>
            </div>

        </div>
    )
}

export default Authentication