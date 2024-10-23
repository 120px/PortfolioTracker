# Generated by Django 5.1.1 on 2024-10-20 20:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0002_alter_holdings_average_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='holdings',
            name='average_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=15),
        ),
        migrations.AlterField(
            model_name='holdings',
            name='num_of_shares',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=15),
        ),
        migrations.AlterField(
            model_name='holdings',
            name='total_cost',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=15),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='cost',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=15),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='num_of_shares',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=15),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=15),
        ),
    ]