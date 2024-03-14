import re
import requests
from datetime import datetime

# das hier muss dann umgetauscht werden auf die 'richtige' API vom Stromspeicher -> bis jetzt nur unsere Simulation
url = "https://localhost:7093/GetSimulation"

response = requests.get(url, verify=False)

if response.status_code == 200:
    responsetext = response.text

    # es soll nach dem Wert percentValue gesucht werden
    patternpercent = r'"percentValue":\s*([^"]+ )'
    match = re.search(patternpercent, responsetext)

    if match:
        value = match.group(1)
        # print(f"Prozentuelle Rate im Speicher: {value}%")

    else:
        print("Error: Keine prozentuelle Rate angegeben")


    # es soll nach dem Wert value gesucht werden
    patternfull = r'"value":\s*([^"]+ )'
    matchfull = re.search(patternfull, responsetext)

    if matchfull:
        valuefull = matchfull.group(1)
        # print(f"Rate im Speicher: {valuefull}mA/h")

    else:
        print("Error: Keine Rate angegeben")
else:
    print(f"Error: {response.status_code}")
    print("Fehler beim Laden der API", response.text)


# aktuelle Zeit wird bestimmt und in benötigtes Format umgeformt
currentTimestamp = datetime.now()
formattedTimestamp = currentTimestamp.strftime("%Y-%m-%dT%H:%M:%S")

# Problem bei meiner Regex: nach Zahl wird ein Leerzeichen mitgenommen, darum filtere ich das hier weg
formattedvalue = ""
formattedfullvalue = ""

for i in range(len(value)):
    length = len(value)
    if(i != length-1):
        formattedvalue += value[i]

for i in range(len(valuefull)):
    length = len(valuefull)
    if(i != length-1):
        formattedfullvalue += valuefull[i]


# Neu erzeugter Datensatz wird in Datenbank eingefügt
addurl="https://localhost:7000/api/Stromspeicher/AddSpeicher"
body = {"percentValue": float(formattedvalue), "value": float(formattedfullvalue), "timestamp": formattedTimestamp}

addresponse = requests.post(addurl, json=body, verify=False)
if addresponse.status_code == 200:
    print(response.json())
else:
    print(f"Error: {addresponse.status_code}")
    print(addresponse.text)