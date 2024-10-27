import { Button } from '../ui/button'
import React, { useState } from 'react'
import LoginBtn from './LoginBtn'
import AuthProps from "../../interfaces/AuthProps"
import { AuthModeTypes } from '../../enums/AuthModeTypes'
import axios from 'axios'
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form'
import { Input } from '../ui/input'

const Login: React.FC<AuthProps> = ({ setAuthMode, setIsAuthenticated }) => {
    const { register, handleSubmit } = useForm()
    const [formErrors, setFormErrors] = useState("")

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        axios.post("http://127.0.0.1:8000/authentication/login/", data)
            .then(response => {
                localStorage.setItem("access_token", response.data.access)
                setIsAuthenticated(true)

            })
            .catch(error => {
                if (error.response)
                    setFormErrors(error.response.data)
                else if (error.request)
                    console.log("Error request: " + error.request)
                else
                    console.log(error)
            })
    }

    return (
        <div className='flex flex-col'>
            <form onSubmit={handleSubmit(onSubmit)}>
                {formErrors !== "" ? <p className='text-center text-sm text-red-600'>{formErrors}</p> : null}
                <Input {...register("username")} type='username' placeholder='Username' className='my-2' />
                <Input {...register("password")} required={true} type='password' placeholder='Password' className='my-2' />

                <div className='text-center pt-5'>
                    <LoginBtn setIsAuthenticated={setIsAuthenticated}></LoginBtn>
                </div>


            </form>

            <div className='pt-10 text-center'>
                <p className='pb-3'>Don't have an account?</p>
                <Button onClick={() => setAuthMode(AuthModeTypes.REGISTER)}>
                    Register
                </Button>
            </div>



        </div>
    )
}

export default Login