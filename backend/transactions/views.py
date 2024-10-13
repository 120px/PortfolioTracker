from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Transaction
from .serializer import TransactionSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def register_transaction(request):
    try:
        #User can register a buy or a sell action
        user = request.user
        transaction_type = request.data.get("transactionType")
        transaction_date = request.data.get("transactionDate")
        transaction_price = request.data.get("transactionPrice")

        transaction = Transaction(user=user, type=transaction_type, date=transaction_date, price=transaction_price)
        transaction.save()

        print(f"User {user.username} is making a transaction.")
        return Response({"detail": "Transaction registered successfully"}, status=201)
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
