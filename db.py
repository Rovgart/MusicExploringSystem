from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
import pandas as pd
import kagglehub
from models.models import Song,Base   # Import z models, nie schemas!

load_dotenv()

DB_URL = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
engine = create_engine(DB_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

# Utwórz tabele
Base.metadata.create_all(bind=engine)

# Pobierz dane
path = kagglehub.dataset_download("jashanjeetsinghhh/songs-dataset")
music_csv = os.path.join(path, "Music.csv")
df = pd.read_csv(music_csv).dropna()

session = SessionLocal()

try:
    songs_to_add = []
    
    for _, row in df.iterrows():
        song = Song(
            name=str(row["name"]),
            artist=str(row["artist"]),
            spotify_id=str(row["spotify_id"]),
            preview_url=str(row["preview"]) if pd.notna(row["preview"]) else None,
            img=str(row["img"]),
            danceability=float(row["danceability"]),
            energy=float(row["energy"]),
            loudness=float(row["loudness"]),
            speechiness=float(row["speechiness"]),
            acousticness=float(row["acousticness"]),
            instrumentalness=float(row["instrumentalness"]),
            liveness=float(row["liveness"]),
            valence=float(row["valence"]),
            acousticness_artist=float(row["acousticness_artist"]),
            danceability_artist=float(row["danceability_artist"]),
            energy_artist=float(row["energy_artist"]),
            instrumentalness_artist=float(row["instrumentalness_artist"]),
            liveness_artist=float(row["liveness_artist"]),
            speechiness_artist=float(row["speechiness_artist"]),
            valence_artist=float(row["valence_artist"])
        )
        songs_to_add.append(song)
        
        if len(songs_to_add) >= 1000:
            session.add_all(songs_to_add)
            session.commit()
            songs_to_add = []
            print(f"Dodano {len(songs_to_add)} piosenek...")
    

    if songs_to_add:
        session.add_all(songs_to_add)
        session.commit()
    
    print(f"Sukces! Dodano {len(df)} piosenek do bazy danych.")
    
except Exception as e:
    session.rollback()
    print(f"Błąd: {e}")
finally:
    session.close()