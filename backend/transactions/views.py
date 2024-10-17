from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Transaction, Holdings
from .serializer import TransactionSerializer, HoldingsSerializer
from authentication.models import CustomUser
from authentication.serializer import UserSerializer


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

            # Edit the user's holding of the current stock
            holding.average_price = average_price
            holding.total_cost = total_cost
            holding.save()

            # Edit contribution
            user.total_contribution += transaction_cost
            user.save()

        elif transaction_type.lower() == "sell":
            total_shares = holding.num_of_shares - int(transaction_num_of_shares)

            if total_shares < 0:
                print("negative value")

            total_cost = holding.total_cost / int(transaction_num_of_shares)
            holding.num_of_shares = total_shares
            print(holding.average_price)
            # HOW DO YOU CALCULATE THE AVERGAGE PRICE ON SELL?
            average_price = (holding.average_price - transaction_cost) / holding.num_of_shares
            holding.average_price = average_price
            holding.total_cost = total_cost
            holding.save()

        transaction.save()
        user_transactions = Transaction.objects.filter(user=user)
        user_holdings = Holdings.objects.filter(user=user)
        # user_general_information = CustomUser.objects.filter(user=user)

        transactions_serializer = TransactionSerializer(user_transactions, many=True)
        holdings_serializer = HoldingsSerializer(user_holdings, many=True)
        # user_serializer = UserSerializer(user_general_information, many=True)
        return Response({
            "user_transactions": transactions_serializer.data,
            "user_holdings": holdings_serializer.data,
            # "user_general_information": user_serializer.data
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

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_user_data(request):
    user = request.user
    transactions = Transaction.objects.filter(user=user)
    holdings = Holdings.objects.filter(user=user)

    transactions_serializer = TransactionSerializer(transactions, many=True)
    holdings_serializer = HoldingsSerializer(holdings, many=True)

    print(transactions_serializer.data)
    print(holdings_serializer.data)

    return Response({
        "user_transactions": transactions_serializer.data,
        "user_holdings": holdings_serializer.data,
    })

#Holdings
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_user_holdings(request):
    try:
        user = request.user
        holdings = Holdings.objects.filter(user=user)
        serializer = HoldingsSerializer(holdings, many=True)
        print(serializer.data)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_400_BAD_REQUEST)


