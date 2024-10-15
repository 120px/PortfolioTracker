from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Transaction, Holdings
from .serializer import TransactionSerializer, HoldingsSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def register_transaction(request):
    try:
        #User can register a buy or a sell action
        user = request.user
        transaction_type = request.data.get("transactionType")
        transaction_date = request.data.get("transactionDate")
        transaction_price = request.data.get("transactionPrice")
        transaction_num_of_shares = request.data.get("transactionNumOfShares")
        transaction_cost = request.data.get("transactionCost")
        transaction_stock_name = request.data.get("transactionStockName")

        transaction = Transaction(user=user, type=transaction_type, date=transaction_date,
                                  price=transaction_price, num_of_shares=transaction_num_of_shares,
                                  cost=transaction_cost, stock_name=transaction_stock_name)

        holding, created = Holdings.objects.get_or_create(user=user, ticker=transaction_stock_name)

        if transaction_type.lower() == "buy":
            total_shares = holding.num_of_shares + int(transaction_num_of_shares)
            total_cost = holding.total_cost / int(transaction_num_of_shares)
            holding.num_of_shares = total_shares
            print(holding.average_price)
            average_price = (holding.average_price + transaction_cost) / holding.num_of_shares
            holding.average_price = average_price
            holding.total_cost = total_cost
            holding.save()

        # transaction.save()
        # print(transaction)
        #
        # user_transactions = Transaction.objects.filter(user=user)
        # serializer = TransactionSerializer(user_transactions, many=True)
        return Response(
            {
                "detail": "Transaction registered successfully",
                # "transactions": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )
    except Exception as e:
        print(f"Error registering transaction: {str(e)}")
        return Response({"detail": "An error occurred while registering the transaction."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_user_transactions(request):
    try:
        user = request.user
        transactions = Transaction.objects.filter(user=user)
        serializer = TransactionSerializer(transactions, many=True)
        print(serializer.data)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_400_BAD_REQUEST)

#Holdings
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def modify_holdings(request):
    try:
        user = request.user
        holdings = Holdings.objects.filter(user=user)
        serializer = HoldingsSerializer(holdings, many=True)
        print(serializer.data)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_user_holdings(request):
    try:
        user = request.user

    except Exception as e:
        print("Error in getting user holdings: " + e)

