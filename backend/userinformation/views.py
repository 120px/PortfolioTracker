from decimal import Decimal, ROUND_HALF_UP
from rest_framework.decorators import api_view
from rest_framework.response import Response
from transactions.serializer import HoldingsSerializer
from transactions.models import Holdings
from yfinanceapi import SearchTicker
import yfinance as yf

@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def calculate_portfolio_value(request):
    # Total portfolio value
    # Get number of shares for each holding
    # multiply number of shares to each corresponding holding price
    # add that all together
    try:
        searchTicker = SearchTicker()
        user = request.user
        holdings = Holdings.objects.filter(user=user)
        holdings_serializer = HoldingsSerializer(holdings, many=True)
        holdings_data = holdings_serializer.data
        total_value = 0

        if holdings_data:
            print(holdings_data[0])
            for obj in holdings_data:
                price = searchTicker.get_fund_ticker_price(obj["ticker"])
                total_value += (Decimal(price) * Decimal(obj["num_of_shares"])).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)

        return Response(total_value, status=200)
    except Exception as e:
        print(e)
        return Response()

def take_user_snapshot():
    