# Generated by Django 5.1.2 on 2024-10-13 04:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0003_rename_full_name_transaction_stock_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='num_of_shares',
            field=models.IntegerField(default=1),
        ),
    ]
