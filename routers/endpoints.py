from fastapi import APIRouter, Query
from typing import List, Optional
from schemas.schemas import SongSchema, PaginatedSchema
from services.init import get_song_service
from db import SessionLocal

database = SessionLocal()
song_service = get_song_service(database)

router = APIRouter(prefix="/api", tags=["Songs"])

@router.get("/songs/", response_model=PaginatedSchema)
def get_filtered_songs(sort:Optional[str]=Query("asc", description="Field to sort e.g 'danceability' "), order:Optional[str]=Query(None, description="Order to sort by, e.g. 'asc'"),searchTerm:str="", page=1,pageLimit=20):
    data=song_service.filter_songs( sort, order, searchTerm, page, pageLimit)
    return data
@router.get("/song/{id}", response_model=SongSchema)
def get_single_song(id):
    data=song_service.get_song(id)
    return data