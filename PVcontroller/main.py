import re
import requests
from datetime import datetime

# das hier muss dann umgetauscht werden auf die 'richtige' API -> bis jetzt nur unsere Simulation
url = "https://localhost:7093/GetSimulationPv"

response = requests.get(url, verify=False)

if response.status_code == 200:
    responsetext = response.text

    # es soll nach dem Wert rate gesucht werden
    rate = r'"rate":\s*([^"]+ )'
    match = re.search(rate, responsetext)

    if match:
        value = match.group(1)
        print(f"Rate der PV-Anlage: {value}")

    else:
        print("Error: Keine Rate angegeben")

else:
    print(f"Error: {response.status_code}")
    print("Fehler beim Laden der API", response.text)


# aktuelle Zeit wird bestimmt und in benötigtes Format umgeformt
currentTimestamp = datetime.now()
formattedTimestamp = currentTimestamp.strftime("%Y-%m-%dT%H:%M:%S")


# Neu erzeugter Datensatz wird in Datenbank eingefügt
addurl="https://localhost:7000/api/Pvanlage/AddPv"
body = {"rate": float(value), "timestamp": formattedTimestamp}

addresponse = requests.post(addurl, json=body, verify=False)
if addresponse.status_code == 200:
    print(response.json())
else:
    print(f"Error: {addresponse.status_code}")
    print(addresponse.text)