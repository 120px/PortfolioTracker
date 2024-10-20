from django.shortcuts import render
from authentication.serializer import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from transactions.models import Holdings
from transactions.serializer import HoldingsSerializer


@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def calculate_portfolio_value(request):
    # Total portfolio value
    # Get number of shares for each holding
    # multiply number of shares to each corresponding holding price
    # add that all together
    try:
        user = request.user
        user_holdings = Holdings.objects.filter(user=user)
        holdings_serializer = HoldingsSerializer(user_holdings, many=True)
        print(holdings_serializer.data)
        print("here")

        return Response()
    except Exception as e:
        return Response()