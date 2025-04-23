import time

from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
import yfinance as yf
import requests


class SearchTicker(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            user_input = request.query_params.get("userInput", "")
            if not user_input or user_input == "":
                return Response("Please enter a ticker", status=status.HTTP_400_BAD_REQUEST)

            action = request.query_params.get("action", "")

            if action == "get_ticker_information":
                return self.get_ticker_information(request)
            elif action == "validate_ticker":
                return self.validate_ticker(request)

            return Response("", status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"This ticker does not exist."}, status=status.HTTP_404_NOT_FOUND)

    def validate_ticker(self, request):
        ticker = request.query_params.get("userInput")
        try:
            ticker_info = yf.Ticker(ticker)
            return Response(data=ticker_info.info["longName"], status=status.HTTP_200_OK)
        except Exception as e:
            print({e})
            return Response({"error": "Ticker not valid."}, status=status.HTTP_400_BAD_REQUEST)


    def get_ticker_information(self, request):
        tickers = request.query_params.get("tickers")
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

            return Response(data=toReturn, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    def get_fund_ticker_price(self, ticker):
        try:
            ticker_info = yf.Ticker(ticker)
            ticker_history = ticker_info.history(period="1d")
            ticker_data = ticker_history["Close"].iloc[0]
            return ticker_data
        except Exception as e:
            print(e)
