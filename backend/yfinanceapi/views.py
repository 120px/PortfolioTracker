from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
import yfinance as yf
import requests

class SearchTicker(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            action = request.query_params.get("action", "")
            if action == "get_ticker_information":
                return self.get_ticker_information(request)

            user_input = request.query_params.get("userInput", "")

            if not user_input:
                return Response(status=400)

            ticker_info = yf.Ticker(user_input)
            return Response(ticker_info.info['longName'], status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    def get_ticker_information(self, request):
        tickers = request.query_params.get("tickers")
        print(tickers)
        toReturn = []
        try:
            tickers_data = yf.Tickers(tickers)

            for ticker_symbol, ticker_object in tickers_data.tickers.items():
                if "fundFamily" in ticker_object.info:
                    # We are in a fund / etf
                    price = self.get_fund_ticker_price("vfv.to")
                    toReturn.append({ticker_symbol: {"ticker_price": price}})
                else:
                    # We are in a regular stock
                    toReturn.append({ticker_symbol: {"ticker_price": ticker_object.info.get("currentPrice")}})

            # Calculate portfolio value


        except Exception as e:
            print(e)

        try:
            return Response(data=toReturn, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    def get_fund_ticker_price(self, ticker):
        try:
            ticker_info = yf.Ticker(ticker)
            ticker_history = ticker_info.history(period="1d")
            ticker_data = ticker_history["Close"][0]
            return ticker_data
        except Exception as e:
            print(e)



