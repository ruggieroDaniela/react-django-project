# Generated by Django 4.1.8 on 2023-05-06 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="found_app_by",
            field=models.CharField(default="", max_length=256),
        ),
        migrations.AddField(
            model_name="user",
            name="language",
            field=models.CharField(
                choices=[("es", "Spanish"), ("en", "English")],
                default="en",
                max_length=2,
            ),
        ),
    ]
