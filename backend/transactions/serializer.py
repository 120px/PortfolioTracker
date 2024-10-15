from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Transaction, Holdings

class TransactionSerializer(serializers.ModelSerializer):
    print("Transaction Serializer")
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'type', 'date', 'price', 'num_of_shares', 'cost', 'stock_name']

class HoldingsSerializer(serializers.ModelSerializer):
    print("Holdings Serializer")

    class Meta:
        model = Holdings
        fields = ["id", "user_id", "stock_name", "ticker", "average_price", "num_of_shares"]
