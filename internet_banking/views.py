from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Deposit, Withdraw, Transfer
from .serializers import *


@api_view(['GET', 'POST'])
def deposits_list(request):
    if request.method == 'GET':
        data = Deposit.objects.all()

        serializer = DepositSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = DepositSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def deposits_detail(request, id):
    try:
        deposit = Deposit.objects.get(id=id)
    except Deposit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = DepositSerializer(
            deposit, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        deposit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
