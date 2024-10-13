from django.urls import path
from .views import SearchTicker

urlpatterns = [
    path('search_stock/', SearchTicker.as_view(), name='search_stock'),

]