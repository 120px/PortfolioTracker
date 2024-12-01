from django.urls import path
from .views import upload_file

urlpatterns = [
    path('get_user_file/', upload_file, name='register_transaction'),
]