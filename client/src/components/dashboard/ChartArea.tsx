import React from 'react'
import { Area, AreaChart, Line, LineChart } from "recharts"
import { ChartContainer, ChartTooltipContent, ChartConfig } from "../ui/chart"
import { Button } from '../ui/button'

const chartData = [
    { fifteenDays: 15 },
    { fifteenDays: 30 },
    { fifteenDays: 25 },
    { fifteenDays: 50 },
]

const chartConfig = {
    fifteenDays: {
        label: "test",
        color: "#2563eb",
    }
}

const ChartArea = () => {
    return (
        <ChartContainer config={chartConfig} className="mx-auto min-h-[200px] w-3/4">
            <AreaChart accessibilityLayer data={chartData}>
                <Area type="monotone" dataKey="fifteenDays" stroke="#0bb530" fillOpacity={.4} fill="#6ef08a" />
            </AreaChart>
        </ChartContainer>
    )
}

export default ChartArea