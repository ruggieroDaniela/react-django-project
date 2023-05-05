# Generated by Django 4.1.8 on 2023-04-27 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=70)),
                ("last_name", models.CharField(max_length=70)),
                ("email", models.EmailField(max_length=254)),
            ],
        ),
    ]