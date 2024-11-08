# Generated by Django 5.1.1 on 2024-10-11 03:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField()),
                ('exchange', models.CharField()),
                ('ticker', models.CharField()),
                ('full_name', models.CharField()),
                ('date', models.DateField()),
                ('price', models.IntegerField()),
            ],
        ),
    ]
