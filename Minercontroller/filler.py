from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
import random
import re
import subprocess
import json
import signal
import sys


def signal_handler(sig, frame):
    print('Ctrl+C pressed, exiting gracefully...')
    # Close client connection
    client.close()
    # Add any cleanup actions here if needed
    sys.exit(0)


# Set up InfluxDB connection
url = "http://localhost:8086"  # Update with your InfluxDB URL
token = "Hi7fY6YPGWAQqpuPllFIkqGy4IylmPdWC70RiA86_zAjYwWY67_KxO_JVx2VXdZM1qwsOLGnz3AbAi-PltVU8A=="  # Update with your InfluxDB token
org = "HTL"  # Update with your InfluxDB organization
bucket = "MinerData"  # Update with your InfluxDB bucket

client = InfluxDBClient(url=url, token=token)

# Create a write API instance
write_api = client.write_api(write_options=SYNCHRONOUS)

data = []

# Check if the command was successful
signal.signal(signal.SIGINT, signal_handler)
while True:
    # Access the captured output from stdout
    temp = 60
    hashrate = 120
    random_number = random.randint(1, 100)
    print(random_number)
    if random_number < 50:
        temp = temp - 50
        # print("MINUS 2")
    elif random_number > 90:
        temp = temp - 50
        # print("PLUS 2")

    random_number2 = random.randint(1, 100)
    print(random_number2)
    if random_number2 < 25:
        hashrate = hashrate - 50
        # print("MINUS 2")
    elif random_number2 > 75:
        hashrate = hashrate + 50
        # print("PLUS 2")

    data.append({
        "measurement": "WhatsminerTemp",
        "fields": {"value": int(temp)}
    })
    data.append({
        "measurement": "Whatsminer Hashrate in GH/s",
        "fields": {"value": int(hashrate)}
    })
    write_api.write(bucket=bucket, org=org, record=data)
