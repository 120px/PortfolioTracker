
import React from 'react'
import RegisterBtn from './RegisterBtn'
import AuthProps from '../../interfaces/AuthProps'
import { Button } from '../ui/button'
import { AuthModeTypes } from '../../enums/AuthModeTypes'
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"


const Register: React.FC<AuthProps> = ({ setIsAuthenticated, setAuthMode }) => {
  const form = useForm()

  return (
    <div className='w-1/2'>
      <form className='mx-auto'>
        <Input type='username' placeholder='Username' className='my-2'/>
        <Input type='password' placeholder='Password' className='my-2' />
        {/* <Input type='email' placeholder='email' /> */}

        <div className='text-center pt-5'>
          <RegisterBtn setIsAuthenticated={setIsAuthenticated}></RegisterBtn>
        </div>
        <div className='text-center my-5'>
          <p>Already have an account?</p>
          <Button onClick={() => setAuthMode(AuthModeTypes.LOGIN)}>
            Login
          </Button>
        </div>
      </form>


    </div>

  )
}

export default Register