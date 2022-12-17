from rest_framework import serializers
from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = ('id', 'user_name', 'transaction_type', 'amount',
                  'sender_user_name', 'receiver_user_name', 'created_date')
