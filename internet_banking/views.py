from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Sum

from .models import Transaction
from .serializers import *


@api_view(['GET', 'POST'])
def transactions_list(request):
    if request.method == 'GET':
        data = Transaction.objects.all()

        serializer = TransactionSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        print('serializer.errors')
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['PUT', 'DELETE'])
# def transactions_detail(request, id):
#     try:
#         transaction = Transaction.objects.get(id=id)
#     except Transaction.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'PUT':
#         serializer = TransactionSerializer(
#             transaction, data=request.data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         transaction.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def deposits_list(request):
    data = Transaction.objects.filter(
        transaction_type="deposit").filter(user_name=1).aggregate(total_deposits=Sum('amount'))
    return Response(data)
