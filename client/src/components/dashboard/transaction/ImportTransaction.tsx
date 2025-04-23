import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"

const ImportTransaction = () => {
    const { register, handleSubmit, getValues } = useForm()
    const [importedFile, setImportedFile] = useState<File>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (data.file[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            console.log(data.file[0].type)

            if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== undefined) {
                let access_token = localStorage.getItem("access_token")
                data = { ...data }
                axios.post("http://127.0.0.1:8000/importdata/upload_file/", data, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    },

                })
                    .then(response => {
                        console.log(response)
                    })
            }
        }
    }

    return (

        <DialogContent>
            <DialogHeader>
                <DialogTitle className='pb-6'>Import History</DialogTitle>
                <DialogDescription>
                    <form className='flex flex-col text-center' onSubmit={handleSubmit(onSubmit)}>
                        <Input {...register("file")} required={true} type="file"></Input>
                        <div className="text-center">
                            <Button>Submit</Button>
                        </div>
                    </form>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    )
}

export default ImportTransaction