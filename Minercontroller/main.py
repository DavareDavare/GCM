import time
import subprocess

def call_scriptAntminer():
    subprocess.run(["python3", "Antminer.py"])

def call_scriptWhatsminer():
    subprocess.run(["python3", "Whatsminer.py"])

while True:
    print("New Data")
    call_scriptAntminer()
    call_scriptWhatsminer()