from django.urls import path
from .views import register_transaction, get_all_user_transactions

urlpatterns = [
    path('register_transaction/', register_transaction, name='register_transaction'),
    path("get_all_user_transactions/", get_all_user_transactions, name="get_all_user_transactions")
]