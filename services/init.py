from .song_service import SongService

def get_song_service(db) -> SongService:
    return SongService(db)