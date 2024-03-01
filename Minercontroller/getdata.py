from influxdb_client import InfluxDBClient
from influxdb_client.client.write_api import SYNCHRONOUS


def get_data_from_influxdb(url, token, org, bucket, query):
    # Set up InfluxDB connection
    client = InfluxDBClient(url=url, token=token)

    # Create a query API instance
    query_api = client.query_api()

    # Execute the query
    result = query_api.query(org=org, query=query)

    # Close client connection
    client.close()

    return result

# Set up InfluxDB connection
url = "http://localhost:8086"  # Update with your InfluxDB URL
token = "6bbHy-i0CQdZF_OS1bUG7T63X6nM851UzZXel0OS8rNPxYwfByI4vG3OEo22jMXyU1Xo5sz_gWU0_p437tw0cQ=="            # Update with your InfluxDB token
org = "HTL"                # Update with your InfluxDB organization
bucket = "Minerdata"          # Update with your InfluxDB bucket
query = 'from(bucket: "Minerdata") |> range(start: -1h)'

result = get_data_from_influxdb(url, token, org, bucket, query)
for table in result:
    for record in table.records:
        print(record.values)
