from django.urls import path
from .views import register_transaction

urlpatterns = [
    path('register_transaction/', register_transaction, name='register_transaction'),
]