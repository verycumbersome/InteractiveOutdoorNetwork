# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-25 02:00
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ION', '0007_auto_20170524_1857'),
    ]

    operations = [
        migrations.RenameField(
            model_name='gearpost',
            old_name='id',
            new_name='post_id',
        ),
    ]