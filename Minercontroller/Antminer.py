import random
import time
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
import re
import subprocess

# Set up InfluxDB connection
url = "http://localhost:8086"  # Update with your InfluxDB URL
token = "6bbHy-i0CQdZF_OS1bUG7T63X6nM851UzZXel0OS8rNPxYwfByI4vG3OEo22jMXyU1Xo5sz_gWU0_p437tw0cQ=="            # Update with your InfluxDB token
org = "HTL"                # Update with your InfluxDB organization
bucket = "Minerdata"          # Update with your InfluxDB bucket

client = InfluxDBClient(url=url, token=token)

# Create a write API instance
write_api = client.write_api(write_options=SYNCHRONOUS)


result = subprocess.run(["./getStatsAntminer.sh"], capture_output=True, text=True)

# Check if the command was successful
if result.returncode == 0:
    # Access the captured output from stdout
    script_output = result.stdout
    matches = re.findall(r'(temp_chip[1-3]|GHS 5s)=([\d.-]+)', script_output)
else:
    print("Error: The script returned a non-zero exit status.")

data = []

i = 1
for match in matches:
    measurement, value = match
    if "temp" in measurement:
        numbers = value.split("-")

        data.append({
            "measurement": "AntminerTempIN" + str(i),
            "fields": {"value": int(numbers[0])}
        })
        data.append({
            "measurement": "AntminerTempOUT" + str(i),
            "fields": {"value": int(numbers[-1])}
        })

        # Increment i inside the loop
        i += 1
    else:
        data.append({
            "measurement": "Antminer Hashrate in GH/s",
            "fields": {"value": float(value)}
        })

# Move write_api.write out of the loop to avoid writing multiple times in one iteration
write_api.write(bucket=bucket, org=org, record=data)

# Close client connection
client.close()
