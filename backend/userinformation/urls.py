from django.urls import path
from authentication.models import CustomUser
from .views import calculate_portfolio_value, get_user_snapshot

urlpatterns = [
    path('calculate_portfolio_value/', calculate_portfolio_value, name='calculate_portfolio_value'),
    path("get_user_snapshot", get_user_snapshot, name="get_user_snapshot")
]