from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def upload_file(request):
    print(request)

