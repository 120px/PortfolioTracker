import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import TransactionComboBox from './TransactionComboBox'
import axios from 'axios'
import { Button } from '../ui/button'


const CreateTransactionModal = () => {
    const { register, handleSubmit } = useForm()
    const [transactionType, setTransactionType] = useState<string>("")

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== undefined) {
            let access_token = localStorage.getItem("access_token")
            data = { ...data, transactionType }
            axios.post("http://127.0.0.1:8000/transactions/register_transaction/", data, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
                .then(response => {
                    console.log("submitted transaction")
                })
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    }

    return (
        <Dialog>
            <DialogTrigger className=''>Add</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add transaction</DialogTitle>
                    <DialogDescription>
                        <form className='flex flex-col text-center' onSubmit={handleSubmit(onSubmit)}>
                            <TransactionComboBox setTransactionType={setTransactionType} transactionType={transactionType}></TransactionComboBox>

                            <Input {...register("transactionStockName")} type='text' placeholder='Stock Name' className='my-2' />
                            <Input {...register("transactionDate")} type='date' placeholder='Date' className='my-2' />

                            <div className='flex flex-row gap-3'>
                                <Input {...register("transactionPrice", { onChange: (e) => handleChange})} type='text' placeholder='Price' className='my-2' />
                                <Input {...register("transactionNumOfShares")} type='text' placeholder='Number of Shares' className='my-2' />
                            </div>

                            <div className='flex'>
                                <Input disabled {...register("transactionCost")} type='text' placeholder='Cost' className='my-2' />
                            </div>
                            <Button>Submit</Button>
                        </form>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default CreateTransactionModal