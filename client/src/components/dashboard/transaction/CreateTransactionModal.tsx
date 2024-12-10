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

const CreateTransactionModal = (data: any) => {
    const { register, handleSubmit, getValues } = useForm()
    const { userData, setUserData } = useUserData();
    const [transactionType, setTransactionType] = useState<Object>({ status: "NONE", hasError: false })
    const [formErrors, setFormErrors] = useState("")
    const [validatedTicker, setValidatedTicker] = useState<Boolean | undefined>(undefined)

    const [transactionPrice, setTransactionPrice] = useState<number | undefined>(undefined)
    const [transactionNumOfShares, setTransactionNumOfShares] = useState<number | undefined>(undefined)
    const [transactionCost, setTransactionCost] = useState<number | undefined>(undefined)
    const [fetchedTransactionStockName, setFetchedTransactionStockName] = useState<string>("")

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (transactionType.status == "NONE") {
            setTransactionType((prev) => ({
                ...prev,
                hasError: true,
            }));
            return showTransactionTypeError()
        }

        if (validatedTicker === false) {
            return
        }

        if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== undefined) {
            let access_token = localStorage.getItem("access_token")
            data = { ...data, transactionType, transactionCost }
            axios.post("http://127.0.0.1:8000/transactions/register_transaction/", data, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },

            })
                .then(response => {
                    console.log(response)
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
                    setValidatedTicker(true)
                }
            }).catch((error) => {
                if (error.response)
                    setFormErrors(error.response.data)

                console.log(validatedTicker)
                setValidatedTicker(false)
            })
    }

    const showTransactionTypeError = () => {
        return <p>Please select a transaction type</p>
    }

    return (
        <>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='pb-6'>Add transaction</DialogTitle>
                    <DialogDescription>
                        <form className='flex flex-col text-center' onSubmit={handleSubmit(onSubmit)}>
                            {transactionType.hasError == true ? <p className='text-red-500'>Please select a transaction type</p> : null}
                            <TransactionComboBox setTransactionType={setTransactionType} transactionType={transactionType}></TransactionComboBox>

                            <div className='flex flex-row items-baseline gap-4'>
                                <div className='flex flex-col w-full'>
                                    <Input {...register("transactionStockName")} required={true} type='text' placeholder='Stock Name'
                                        className={validatedTicker == false ? "border-red-600 border-2 my-2" : "my-2"} value={fetchedTransactionStockName}
                                        onChange={(e) => setFetchedTransactionStockName(e.target.value)} />
                                </div>
                                <Button type='button' onClick={() => {
                                    const ticker = getValues("transactionStockName");
                                    validateTicker(ticker);
                                }}>Validate</Button>
                            </div>

                            <Input {...register("transactionDate")} required={true} type='date' placeholder='Date' className='my-2' />

                            <div className='flex flex-row gap-3'>
                                <Input {...register("transactionPrice", { onChange: (e) => handlePriceChange(e) })} required={true} type='text' placeholder='Price' className='my-2' />
                                <Input {...register("transactionNumOfShares", { onChange: (e) => handleSharesChange(e) })} required={true} type='text' placeholder='Number of Shares' className='my-2' />
                            </div>

                            <Input value={transactionCost !== undefined ? transactionCost.toFixed(2) : ''}
                                {...register("transactionCost")} type='number' placeholder='Cost' className='my-2' required={true} />

                            <Button>Submit</Button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </>

    )
}

export default CreateTransactionModal