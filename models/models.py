from sqlalchemy import Column, String, Float, Integer
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Song(Base):
    __tablename__ = 'songs'

    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    artist = Column(String(100), nullable=False)
    spotify_id = Column(String(22), unique=True, nullable=False)
    preview_url = Column(String, nullable=True)
    img = Column(String, nullable=False)

    danceability = Column(Float, nullable=False)
    energy = Column(Float, nullable=False)
    loudness = Column(Float, nullable=False)
    speechiness = Column(Float, nullable=False)
    acousticness = Column(Float, nullable=False)
    instrumentalness = Column(Float, nullable=False)
    liveness = Column(Float, nullable=False)
    valence = Column(Float, nullable=False)

    acousticness_artist = Column(Float, nullable=False)
    danceability_artist = Column(Float, nullable=False)
    energy_artist = Column(Float, nullable=False)
    instrumentalness_artist = Column(Float, nullable=False)
    liveness_artist = Column(Float, nullable=False)
    speechiness_artist = Column(Float, nullable=False)
    valence_artist = Column(Float, nullable=False)
