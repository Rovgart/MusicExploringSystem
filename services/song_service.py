import os
import pandas as pd
from models.models import Song
from sqlalchemy.orm import Session
from sqlalchemy import select, or_
from typing import List
class SongService:
    def __init__(self, db:Session) -> None:
        self.db=db

    def get_all_songs(self, page: int, pageLimit: int = 8) -> dict:
        query = self.db.query(Song)
        return self.paginate(query, page, pageLimit)
    def filter_songs(
        self,
        sort_field=None,
        order="desc",
        searchTerm: str = "",
        page: int = 1,
        pageLimit: int = 8
    ):
        query = self.db.query(Song)


        if searchTerm and searchTerm.strip():
            search_patt = f"%{searchTerm.strip()}%"
            query = query.filter(
            or_(
                Song.name.ilike(search_patt),
                Song.artist.ilike(search_patt),
            )
        )


        if sort_field in ["danceability", "title", "energy", "energy_artist", "liveness"]:
            sort_column = getattr(Song, sort_field)
            if order == "desc":
                sort_column = sort_column.desc()
            query = query.order_by(sort_column)


        total_items = query.count()
        total_pages = (int(total_items) + int(pageLimit) - 1) // int(pageLimit)
        offset = (int(page) - 1) * int(pageLimit)
        items = query.offset(offset).limit(pageLimit).all()

        return {
        "items": items,
        "page": page,
        "total_pages": total_pages,
        "total_items": total_items,
        "limit": pageLimit,
        "has_next": int(page) < int(total_pages),
        "has_prev": int(page) > 1
    }

    def get_song(self,id):
        print("Chosen song id", id)
        song=self.db.query(Song).filter(Song.id==id).first()
        if song:
            print(song)
            return song
        else: return None
    @staticmethod
    def paginate(query, page:int, limit:int):

        total_items=query.count()
        total_pages=(total_items + limit -1)// limit
        offset=(page-1)*limit
        items=query.offset(offset).limit(limit).all()
        return {
            "items": items,
            "page": page,
            "limit": limit,
            "total_items": total_items,
            "total_pages": total_pages,
            "has_next": page < total_pages,
            "has_prev": page > 1
        }