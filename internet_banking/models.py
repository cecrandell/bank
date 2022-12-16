from django.conf import settings
from django.db import models
from django.utils import timezone


class Deposit(models.Model):
    id = models.AutoField(primary_key=True)
    user_name = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    amount = models.IntegerField()
    created_date = models.DateTimeField(default=timezone.now)

    def publish(self):
        self.created_date = timezone.now()
        self.save()

    def __str__(self):
        return str(self.id)


class Withdraw(models.Model):
    id = models.AutoField(primary_key=True)
    user_name = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    amount = models.IntegerField()
    created_date = models.DateTimeField(default=timezone.now)

    def publish(self):
        self.created_date = timezone.now()
        self.save()

    def __str__(self):
        return str(self.id)


class Transfer(models.Model):
    id = models.AutoField(primary_key=True)
    sender_user_name = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='sender_user_name', on_delete=models.CASCADE)
    receiver_user_name = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='receiver_user_name', on_delete=models.CASCADE)
    amount = models.IntegerField()
    created_date = models.DateTimeField(default=timezone.now)

    def publish(self):
        self.created_date = timezone.now()
        self.save()

    def __str__(self):
        return str(self.id)
