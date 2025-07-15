import requests
import os

import zipfile

def fetch_file():
    try:
        os.makedirs("data", exist_ok=True)
        # Pobierz metadane pliku
        resp = requests.get("https://otwartedane.erzeszow.pl/v1/resources/839/")
        resp.raise_for_status()  # Rzuci wyjątek, jeśli 4xx/5xx

        data = resp.json()
        file_url = data["file"]
        
        file_resp = requests.get(file_url)
        file_resp.raise_for_status()

        with open("data/ludnosc.zip", "wb") as f:
            f.write(file_resp.content)

        print("✔️ Plik zapisany jako: data/ludnosc.zip")

    except Exception as e:
        print("❌ Błąd:", str(e))
def unpack_files():
    with zipfile.ZipFile("data/ludnosc.zip",'r') as zip_ref:
        zip_ref.extractall("data/ludnosc_shp")

fetch_file()
unpack_files()

