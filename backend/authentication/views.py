from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import UserSerializer
from .models import CustomUser


@api_view(["POST"])
def register_user(request):
    # Errors:
    # check if user already exists
    try:
        if request.method == "POST":
            verify_username = CustomUser.objects.filter(username=request.data["username"])

            if verify_username.exists():
                return Response("Username already taken", status=status.HTTP_409_CONFLICT)

            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    else:
        print("error")
        # If authentication fails, return an error response
        return Response("Username or Password is incorrect", status=401)


@api_view(["POST"])
def logout_user(request):
    return Response({

    })
