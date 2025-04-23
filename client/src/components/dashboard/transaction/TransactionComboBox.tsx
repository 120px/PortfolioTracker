"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { TransactionType } from "../../../enums/TransactionTypesEnum"

const transactionTypeValues = Object.values(TransactionType)

interface props {
    setTransactionType: React.Dispatch<string>
    transactionType: string
}

const TransactionComboBox: React.FC<props> = ({ setTransactionType, transactionType }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {transactionType
                        ? transactionTypeValues.find((type: string) => type === transactionType) || "Select Transaction Type..."
                        : "Select Transaction Type"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>No TransactionType found.</CommandEmpty>
                        <CommandGroup>
                            {transactionTypeValues.map((type: string) => (
                                <CommandItem
                                    key={type}
                                    value={type}
                                    onSelect={(currentValue) => {
                                        setTransactionType(currentValue === transactionType ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            transactionType === type ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {type}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default TransactionComboBox