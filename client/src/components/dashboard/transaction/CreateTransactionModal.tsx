import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../../ui/input'
import TransactionComboBox from './TransactionComboBox'
import axios from 'axios'
import { Button } from '../../ui/button'
import { useUserData } from "../../context/SetUserDataContext"

const CreateTransactionModal = () => {
    const { register, handleSubmit, getValues } = useForm()
    const { userData, setUserData } = useUserData();
    const [transactionType, setTransactionType] = useState<string>("")

    const [transactionPrice, setTransactionPrice] = useState<number | undefined>(undefined)
    const [transactionNumOfShares, setTransactionNumOfShares] = useState<number | undefined>(undefined)
    const [transactionCost, setTransactionCost] = useState<number | undefined>(undefined)
    const [fetchedTransactionStockName, setFetchedTransactionStockName] = useState<string>("")

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== undefined) {
            let access_token = localStorage.getItem("access_token")
            data = { ...data, transactionType, transactionCost }
            axios.post("http://127.0.0.1:8000/transactions/register_transaction/", data, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },

            })
                .then(response => {
                    setUserData(response.data)
                })
        }

    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const price = parseFloat(e.target.value)
        setTransactionPrice(price)
        calculateCost(price, transactionNumOfShares)
    };

    const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const shares = parseFloat(e.target.value)
        setTransactionNumOfShares(shares)
        calculateCost(transactionPrice, shares)
    };

    const calculateCost = (price?: number, shares?: number) => {
        if (price && shares) {
            setTransactionCost(price * shares)
        }
    };

    const validateTicker = (ticker: string) => {
        setFetchedTransactionStockName("")
        axios.get("http://127.0.0.1:8000/yfinanceapi/search_stock/", {
            params: { userInput: ticker }
        })
            .then(response => {
                if (response.data) {
                    setFetchedTransactionStockName(response.data)
                }
            })
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

                            <div className='flex flex-row items-baseline gap-4'>
                                <div className='flex flex-col w-full'>
                                    <Input {...register("transactionStockName")} type='text' placeholder='Stock Name'
                                        className='my-2' value={fetchedTransactionStockName}
                                        onChange={(e) => setFetchedTransactionStockName(e.target.value)} />
                                </div>
                                <Button type='button' onClick={() => {
                                    const ticker = getValues("transactionStockName");
                                    validateTicker(ticker);
                                }}>Search</Button>
                            </div>

                            <Input {...register("transactionDate")} type='date' placeholder='Date' className='my-2' />

                            <div className='flex flex-row gap-3'>
                                <Input {...register("transactionPrice", { onChange: (e) => handlePriceChange(e) })} type='text' placeholder='Price' className='my-2' />
                                <Input {...register("transactionNumOfShares", { onChange: (e) => handleSharesChange(e) })} type='text' placeholder='Number of Shares' className='my-2' />
                            </div>

                            <div className='flex'>
                                <Input value={transactionCost !== undefined ? transactionCost.toFixed(2) : ''}
                                    {...register("transactionCost")} type='number' placeholder='Cost' className='my-2' />
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