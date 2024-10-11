from django.db import models

class Transaction(models.Model):
    type = models.CharField()
    exchange = models.CharField()
    ticker = models.CharField()
    full_name = models.CharField()
    date = models.DateField()
    price = models.IntegerField()

