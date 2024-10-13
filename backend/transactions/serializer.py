from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    print("Transaction Serializer")
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'type', 'date', 'price', 'num_of_shares', 'cost']

