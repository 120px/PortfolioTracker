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
            try:
                total_shares = holding.num_of_shares + float(transaction_num_of_shares)

                if holding.num_of_shares == 0:
                    average_price = transaction_price
                    total_cost = transaction_cost
                else:
                    total_cost = holding.total_cost + transaction_cost
                    average_price = total_cost / total_shares

                holding.num_of_shares = total_shares
                holding.average_price = average_price
                holding.total_cost = total_cost
                print("holding")
                holding.save()

                user.total_contribution += transaction_cost
                user.save()
            except Exception as e:
                print(e)

        elif transaction_type.lower() == "sell":
            try:
                # Update the total number of shares after selling
                transaction_num_of_shares = int(transaction_num_of_shares)
                total_shares = holding.num_of_shares - transaction_num_of_shares

                if total_shares < 0:
                    print("Cannot sell more shares than owned.")
                else:
                    # Calculate the total cost of the shares being sold
                    total_cost_of_sold_shares = holding.average_price * transaction_num_of_shares

                    # Update the total cost of the remaining shares
                    holding.total_cost -= total_cost_of_sold_shares

                    # Update the number of shares
                    holding.num_of_shares = total_shares

                    # Recalculate the average price for the remaining shares
                    if holding.num_of_shares > 0:
                        holding.average_price = holding.total_cost / holding.num_of_shares
                    else:
                        holding.average_price = 0  # Set to 0 if no shares remain
                holding.save()

            except Exception as e:
                print(e)
                return Response(status=status.HTTP_400_BAD_REQUEST)

        transaction.save()
        user_transactions = Transaction.objects.filter(user=user)
        user_holdings = Holdings.objects.filter(user=user)

        transactions_serializer = TransactionSerializer(user_transactions, many=True)
        holdings_serializer = HoldingsSerializer(user_holdings, many=True)
        return Response({
            "user_transactions": transactions_serializer.data,
            "user_holdings": holdings_serializer.data,
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
    user_serializer = UserSerializer(user)

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


