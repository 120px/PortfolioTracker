from django.contrib.auth.models import User
from django.db import models

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    type = models.CharField()
    exchange = models.CharField()
    stock_name = models.CharField()
    ticker = models.CharField()
    date = models.DateField()
    price = models.IntegerField()
    num_of_shares = models.IntegerField(default=0)
    cost = models.IntegerField(default=0)

class Holdings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    stock_name = models.CharField()
    ticker = models.CharField()
    average_price = models.IntegerField(default=0)
    num_of_shares = models.IntegerField(default=0)
    total_cost = models.IntegerField(default=0)