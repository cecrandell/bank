from django.conf import settings
from django.db import models
from django.utils import timezone


class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=255, blank=False, null=True)
    transaction_type = models.CharField(max_length=255, blank=False, null=True)
    amount = models.IntegerField(blank=False, null=True)
    sender_user_name = models.CharField(max_length=255, blank=False, null=True)
    receiver_user_name = models.CharField(max_length=255, blank=False, null=True)
    created_date = models.DateTimeField(default=timezone.now)

    def publish(self):
        self.created_date = timezone.now()
        self.save()

    def __str__(self):
        return str(self.id)
