# Generated by Django 5.1.1 on 2024-10-20 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='holdings',
            name='average_price',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='holdings',
            name='num_of_shares',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='holdings',
            name='total_cost',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='cost',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='num_of_shares',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='price',
            field=models.FloatField(default=0),
        ),
    ]