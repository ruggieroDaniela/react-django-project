# Generated by Django 4.1.8 on 2023-06-10 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="cellphone",
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="email_to_inform",
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="facebook_to_inform",
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="frecuency_to_inform",
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="other_to_inform",
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="phone_to_inform",
            field=models.CharField(blank=True, max_length=24, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="representant_cellphone",
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="representant_telephone",
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="services_interest",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="social_media_to_inform",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="telephone",
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
    ]
