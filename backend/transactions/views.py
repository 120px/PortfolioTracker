from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["POST"])
def register_transaction(request):
    #User can register a buy or a sell action
    transaction_type = request.data.get("transaction_type")
    transaction_date = request.data.get("transaction_date")
    transaction_price = request.data.get("transaction_price")

    print(transaction_type)

    if transaction_type == "BUY":
        transaction_type

        return
    elif transaction_type == "SELL":
        print("user is selling")
        return
    else:
        print("in register")

    return Response(status=status.HTTP_201_CREATED)