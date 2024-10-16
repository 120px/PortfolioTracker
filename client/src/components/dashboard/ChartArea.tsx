import React from 'react'
import { Line, LineChart } from "recharts"
import { ChartContainer, ChartTooltipContent, ChartConfig } from "../ui/chart"

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
}

const ChartArea = () => {
    return (
        <ChartContainer config={chartConfig} className="mx-auto min-h-[200px] w-3/4">
            <LineChart accessibilityLayer data={chartData}>
                <Line dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            </LineChart>
        </ChartContainer>
    )
}

export default ChartArea