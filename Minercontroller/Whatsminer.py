from whatsminer import WhatsminerAccessToken, WhatsminerAPI
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
import re
import subprocess
import json

# Set up InfluxDB connection
url = "http://localhost:8086"  # Update with your InfluxDB URL
token = "6bbHy-i0CQdZF_OS1bUG7T63X6nM851UzZXel0OS8rNPxYwfByI4vG3OEo22jMXyU1Xo5sz_gWU0_p437tw0cQ=="            # Update with your InfluxDB token
org = "HTL"                # Update with your InfluxDB organization
bucket = "Minerdata"          # Update with your InfluxDB bucket

client = InfluxDBClient(url=url, token=token)

# Create a write API instance
write_api = client.write_api(write_options=SYNCHRONOUS)


result = subprocess.run(["python3", "./getStatsWhatsminer.py"], capture_output=True, text=True)

data = []

# Check if the command was successful
if result.returncode == 0:
    # Access the captured output from stdout
    script_output = result.stdout
    script_output = script_output.replace("'", '"')
    parsed_data = json.loads(script_output)
    temperature = parsed_data['SUMMARY'][0]['Temperature']
    mhs_5s = parsed_data['SUMMARY'][0]['MHS 5s']
    data.append({
            "measurement": "WhatsminerTemp",
            "fields": {"value": int(temperature)}
    })
    data.append({
        "measurement": "Whatsminer Hashrate in GH/s",
        "fields": {"value": int(mhs_5s)/1000}
    })
else:
    print("Error: The script returned a non-zero exit status.")

write_api.write(bucket=bucket, org=org, record=data)

# Close client connection
client.close()
