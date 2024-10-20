from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    total_contribution = models.DecimalField(default=0, decimal_places=2, max_digits=15)
    portfolio_value = models.DecimalField(default=0, decimal_places=2, max_digits=15)

