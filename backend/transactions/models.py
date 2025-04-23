from django.contrib.auth.models import User
from django.db import models
from authentication.models import CustomUser

class Transaction(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=1)
    type = models.CharField()
    exchange = models.CharField()
    stock_name = models.CharField()
    ticker = models.CharField()
    date = models.DateField()
    price = models.DecimalField(default=0, decimal_places=2, max_digits=15)
    num_of_shares = models.DecimalField(default=0, decimal_places=2, max_digits=15)
    cost = models.DecimalField(default=0, decimal_places=2, max_digits=15)

class Holdings(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=1)
    stock_name = models.CharField()
    ticker = models.CharField()
    average_price = models.DecimalField(default=0, decimal_places=2, max_digits=15)
    num_of_shares = models.DecimalField(default=0, decimal_places=2, max_digits=15)
    total_cost = models.DecimalField(default=0, decimal_places=2, max_digits=15)