# Generated by Django 4.1.8 on 2023-06-03 02:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="found_app_by",
            field=models.JSONField(null=True),
        ),
    ]