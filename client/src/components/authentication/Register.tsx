
import React from 'react'
import { useState } from "react"
import RegisterBtn from './RegisterBtn'
import AuthProps from '../../interfaces/AuthProps'
import { Button } from '../ui/button'
import { AuthModeTypes } from '../../enums/AuthModeTypes'
import { Input } from "../ui/input"
import { FieldValues, SubmitHandler, useForm, useFormState } from "react-hook-form"
import axios from "axios"

type userLoginFormValues = {
  username: string,
  password: string
}

const Register: React.FC<AuthProps> = ({ setIsAuthenticated, setAuthMode }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [formErrors, setFormError] = useState<string>("")

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios.post("http://127.0.0.1:8000/authentication/register/", data)
      .then(response => {
        console.log("Success")
      })
      .catch(error => {
        if (error.response) {
          setFormError(error.response.data)
          console.log("error: " + error.response.data)
        }
        else if (error.request)
          console.log("Error request: " + error.request)
        else
          console.log(error)
      })
  }

  return (
    <div className='flex flex-col'>
      <form className='' onSubmit={handleSubmit(onSubmit)}>
        {formErrors !== "" ? <p className='text-center text-sm text-red-600'>{formErrors}</p> : null}
        <Input {...register("username")} required={true} maxLength={13} type='username' placeholder='Username' className='my-2' />
        <Input {...register("password")} required={true} type='password' placeholder='Password' className='my-2' />
        {/* <Input type='email' placeholder='email' /> */}

        <div className='text-center pt-5'>
          <RegisterBtn setIsAuthenticated={setIsAuthenticated}></RegisterBtn>
        </div>

      </form>

      <div className='pt-10 text-center'>
        <p className='pb-3'>Already have an account?</p>
        <Button onClick={() => setAuthMode(AuthModeTypes.LOGIN)}>
          Login
        </Button>
      </div>


    </div>

  )
}

export default Register