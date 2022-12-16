from django.contrib import admin
from .models import Deposit, Withdraw, Transfer

admin.site.register(Deposit)
admin.site.register(Withdraw)
admin.site.register(Transfer)
