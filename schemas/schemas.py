from pydantic import BaseModel
from typing import List

class SongSchema(BaseModel):
    id: int
    name: str
    artist: str
    spotify_id: str
    preview_url: str | None
    img: str

    danceability: float
    energy: float
    loudness: float
    speechiness: float
    acousticness: float
    instrumentalness: float
    liveness: float
    valence: float

    acousticness_artist: float
    danceability_artist: float
    energy_artist: float
    instrumentalness_artist: float
    liveness_artist: float
    speechiness_artist: float
    valence_artist: float

    class Config:
        orm_mode = True



class PaginatedSchema(BaseModel):
    items: List[SongSchema]
    page: int
    limit: int
    total_items: int
    total_pages: int
    has_next: bool
    has_prev: bool
    
    class Config:
        orm_mode=True
