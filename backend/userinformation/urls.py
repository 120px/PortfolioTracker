from django.urls import path
from authentication.models import CustomUser
from backend.userinformation.views import calculate_portfolio_value

urlpatterns = [
    path('calculate_portfolio_value/', calculate_portfolio_value, name='calculate_portfolio_value'),
]