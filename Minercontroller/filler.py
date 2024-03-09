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


def Simulate(starttemp, starthash, miner):
    temp = starttemp
    hashrate = starthash
    random_number = random.randint(1, 100)
    print(random_number)
    if random_number < 50:
        temp = temp - 50

    elif random_number > 90:
        temp = temp - 50

    random_number2 = random.randint(1, 100)
    print(random_number2)
    if random_number2 < 25:
        hashrate = hashrate - 50

    elif random_number2 > 75:
        hashrate = hashrate + 50

    if miner == "Whatsminer":
        data = [
            {
                "measurement": "WhatsminerTemp",
                "fields": {"value": int(temp)}
            },
            {
                "measurement": "Whatsminer_Hashrate",
                "fields": {"value": int(hashrate)}
            }
        ]

    if miner == "Antminer":
        data = []
        for i in range(3):
            if i > 0:
                temp = temp-10
            data.append({
                "measurement": f"AntminerTempIN{i}",
                "fields": {"value": int(temp) - 20}
            })
            data.append({
                "measurement": f"AntminerTempOUT{i}",
                "fields": {"value": int(temp)}
            })
        data.append({
            "measurement": "Antminer_Hashrate",
            "fields": {"value": int(hashrate)}
        })


    write_api.write(bucket=bucket, org=org, record=data)


# Set up InfluxDB connection
url = "http://localhost:8086"  # Update with your InfluxDB URL
token = "Hi7fY6YPGWAQqpuPllFIkqGy4IylmPdWC70RiA86_zAjYwWY67_KxO_JVx2VXdZM1qwsOLGnz3AbAi-PltVU8A=="  # Update with your InfluxDB token
org = "HTL"  # Update with your InfluxDB organization
bucket = "MinerData"  # Update with your InfluxDB bucket

client = InfluxDBClient(url=url, token=token)

# Create a write API instance
write_api = client.write_api(write_options=SYNCHRONOUS)

# Check if the command was successful
signal.signal(signal.SIGINT, signal_handler)
while True:
    Simulate(60, 115, "Whatsminer")
    Simulate(80, 230, "Antminer")
