import React from 'react'
import { Button } from '../ui/button'
import { PortfolioActivityEnum } from '@/enums/PortfolioActivityEnum'

interface props {
    buttonName: string
    setPortfolioActivityType: () => void;
}

const PortfolioTypeBtn: React.FC<props> = ({ buttonName, setPortfolioActivityType}) => {
    
    return (
        <p className='px-2 py-0 underline-offset-4 underline' onClick={() => setPortfolioActivityType()}>
            {buttonName.toLowerCase()}
        </p>
    )
}

export default PortfolioTypeBtn