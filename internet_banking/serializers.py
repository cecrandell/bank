from rest_framework import serializers
from .models import Deposit, Withdraw, Transfer


class DepositSerializer(serializers.ModelSerializer):

    class Meta:
        model = Deposit
        fields = ('id', 'user_name', 'amount', 'created_date')
