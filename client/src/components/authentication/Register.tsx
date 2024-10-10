
import React from 'react'
import RegisterBtn from './RegisterBtn'
import AuthProps from '../../interfaces/AuthProps'
import { Button } from '../ui/button'
import { AuthModeTypes } from '../../enums/AuthModeTypes'
import { Input } from "../ui/input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"

type userLoginFormValues = {
  username: string,
  password: string
}

const Register: React.FC<AuthProps> = ({ setIsAuthenticated, setAuthMode }) => {
  const { register, handleSubmit } = useForm()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios.post("http://127.0.0.1:8000/authentication/register/", data)
      .then(response => {
        console.log("Success")
      })
      .catch(error => {
        if (error.response)
          console.log("error: " + error.response.status)
        else if (error.request)
          console.log("Error request: " + error.request)
        else
          console.log(error)
      })
  }

  return (
    <div className='flex flex-col'>
      <form className='' onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("username")} type='username' placeholder='Username' className='my-2' />
        <Input {...register("password")} required={true} type='password' placeholder='Password' className='my-2' />
        {/* <Input type='email' placeholder='email' /> */}

        <div className='text-center pt-5'>
          <RegisterBtn setIsAuthenticated={setIsAuthenticated}></RegisterBtn>
        </div>

      </form>

      <div className='py-10 text-center'>
        <p className='pb-3'>Already have an account?</p>
        <Button onClick={() => setAuthMode(AuthModeTypes.LOGIN)}>
          Login
        </Button>
      </div>


    </div>

  )
}

export default Register