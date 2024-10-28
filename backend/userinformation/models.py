from django.db import models
from django.conf import settings

class PortfolioSnapshot(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    portfolio_value = models.DecimalField(max_digits=20, decimal_places=2)
