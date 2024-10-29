from rest_framework import serializers
from .models import PortfolioSnapshot

class SnapshotSerializer(serializers.ModelSerializer):
    print("SnapshotSerializer")

    class Meta:
        model = PortfolioSnapshot
        fields = ["date", "portfolio_value"]