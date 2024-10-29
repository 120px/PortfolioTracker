import React, { useEffect, useState } from 'react'
import { Area, AreaChart, Line, LineChart } from "recharts"
import { ChartContainer, ChartTooltipContent, ChartConfig } from "../ui/chart"
import { Button } from '../ui/button'
import axios from 'axios'
import IChartData from '@/interfaces/IChartData'

interface props {
    chartData: any
}

const chartConfig = {
    fifteenDays: {
        label: "test",
        color: "#2563eb",
    }
}

const ChartArea: React.FC<props> = ({ chartData }) => {

    return (
        <ChartContainer config={chartConfig} className="mx-auto min-h-[200px] w-100 p-4">
            <AreaChart accessibilityLayer data={chartData}>
                <Area type="monotone" dataKey="portfolio_value" stroke="#0bb530" fillOpacity={.4} fill="#6ef08a" />
            </AreaChart>
        </ChartContainer>
    )
}

export default ChartArea