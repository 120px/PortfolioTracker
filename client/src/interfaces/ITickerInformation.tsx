interface ITickerInformation {
        ticker_price: number
}

export type TickersInfo = Array<{ [key: string]: ITickerInformation }>;