from .models import CustomUser
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    total_contribution = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ["username", "password", "total_contribution"]

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data["username"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    def get(self):
        return
    def get_contribution_information(self, obj):
        return {
            "total_contribution": obj.total_contribution
        }

