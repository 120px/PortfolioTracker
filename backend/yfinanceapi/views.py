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
            user_input = request.query_params.get("userInput", "")

            if not user_input:
                return Response(status=400)

            ticker_info = yf.Ticker(user_input)
            print(ticker_info.info['longName'])

            return Response(ticker_info.info['longName'], status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

