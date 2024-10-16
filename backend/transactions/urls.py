from django.urls import path
from .views import register_transaction, get_all_user_transactions, get_all_user_holdings, get_all_user_data

urlpatterns = [
    path('register_transaction/', register_transaction, name='register_transaction'),
    path("get_all_user_transactions/", get_all_user_transactions, name="get_all_user_transactions"),
    path("get_all_user_holdings/", get_all_user_holdings, name="get_all_user_holdings"),
    path("get_all_user_data/", get_all_user_data, name="get_all_user_data")
]