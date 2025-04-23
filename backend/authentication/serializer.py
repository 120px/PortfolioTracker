from .models import CustomUser
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    total_contribution = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ["username", "password"]

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data["username"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    def get(self):
        return self

